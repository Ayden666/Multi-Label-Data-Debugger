import React, { Component } from 'react'
import { without } from 'lodash'

class ModifyTags extends Component
{
    render()
    {
        if (this.props.item)
        {
            let labelList = Object.keys(this.props.item)
            labelList = without(labelList, "audio_filename")

            return(
            <>
                <nav className="modifyList">
                    <ul className="modifyList">
                        {
                            labelList.map((label, index) =>
                                {
                                    //console.log(label)
                                    //console.log(this.props.item[label])
                                    if (this.props.item[label] === 1)
                                    {
                                        return (
                                            <li key={label}>
                                                <input type="checkbox" id={label} name={label} defaultChecked></input>
                                                <label htmlFor={label}>{label}</label>
                                            </li>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <li key={label}>
                                                <input type="checkbox" id={label} name={label}></input>
                                                <label htmlFor={label}>{label}</label>
                                            </li>
                                        )
                                    }
                                }
                            )
                        }
                    </ul>
                </nav>
            </>
            )
        }
        else
        {
            return null
        }
    }
}

export default ModifyTags