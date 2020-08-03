import React, { Component } from 'react'
import * as d3 from 'd3'

class ShowAgreement extends Component
{
    constructor(props)
    {
        super(props)
        this.createMap = this.createMap.bind(this)
    }

    componentDidMount()
    {
        this.createMap()
    }

    componentDidUpdate()
    {
        this.createMap()
    }

    createMap()
    {
        const node = this.node
        const data = this.props.data
        const logAgreementData = this.props.logAgreementData
        const filterCurrentInstances = this.props.filterCurrentInstances
        
        let width = 450
        let height = 450
        let margin = 
                {
                    top: 10,
                    bottom: 10,
                    left: 10,
                    right: 10
                }
        let bodyHeight = height - margin.top - margin.bottom
        let bodyWidth = width - margin.left - margin.right
        
        let container = d3.select(node)

        container
            .attr("width", width)
            .attr("height", height)

        data.forEach(d =>
            {
                d.agreement = parseFloat(d.agreement)
            })

        let first_label = d3.map(data, d => d.label1).keys()
        first_label.sort()

        let xScale = d3.scaleBand()
        xScale
            .range([0, bodyWidth])
            .domain(first_label)
            .padding(0.02)

        let second_label = d3.map(data, d => d.label2).keys()
        second_label.sort()

        let yScale = d3.scaleBand()
        yScale 
            .range([0, bodyHeight])
            .domain(second_label)
            .padding(0.02)

        let colorScale = d3.scaleSqrt()
        colorScale
            .range(["white", "green"])
            .domain([0, 1])

        let body = container
                            .append("g")
                            .style("transform", `translate(${margin.left}px, ${margin.top}px)`)

        let join = body
                        .selectAll("rect")
                        .data(data)

        join
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.label1))
            .attr("y", d => yScale(d.label2))
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .attr("fill", d => colorScale(d.agreement)) 
            .on("mouseenter", function(d)
                {
                    filterCurrentInstances(d.label1, d.label2)  
                    logAgreementData(d.label1, d.label2, d.agreement)
                    d3
                        .select(this)
                        .attr("fill", "yellow")
                })
            .on("mouseleave", function(d) 
                {
                    logAgreementData(null, null, null)
                    d3
                        .select(this)
                        .attr("fill", d => colorScale(d.agreement))
                })
            .on("click", function(d) 
                {
                    console.log("clicked!!!")
                    d3
                        .select(this)
                        .attr("fill", "black")

                    filterCurrentInstances(d.label1, d.label2)             
                })
    }

    render()
    {
        return(
            <svg ref={node => this.node = node}>
            </svg>
        )
    }
}

export default ShowAgreement;