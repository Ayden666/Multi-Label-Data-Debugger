import React, { Component } from 'react'

class ShowList extends Component
{
  render()
  {
    return(
      <>
        <nav className="audioList">
          <ul className="audioList">
            {
              this.props.listItems.map(item =>
                (
                  <li key={ item.audio_filename }>
                    <p>
                      { item.audio_filename }
                      <span style={{margin: "10px"}} />
                      <button onClick={() => this.props.logCurrentTags(item)}>Show Tags</button>
                      <span style={{margin: "10px"}} />
                      <button onClick={() => this.props.flagAudio(item)}>Flag Audio</button>
                    </p>
                    
                    <audio 
                      controls
                      src={ './audio/' + item.audio_filename }
                      type="audio/wav">
                      Failed to play audio
                    </audio>
                  </li>
                )
              )
            }
          </ul>
        </nav>
      </>
    )
  }
}

export default ShowList