import React, { Component } from 'react'

class ShowTags extends Component
{
  render()
  {
    if (this.props.tags)
    {
        console.log(this.props.tags)
        return(
        <>
            <nav className="tagsList">
            <ul className="tagsList">
                {
                this.props.tags.map(item =>
                    (
                    <li key={ item.tag }>
                        <p>{ item.tag }</p>
                    </li>
                    )
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

export default ShowTags