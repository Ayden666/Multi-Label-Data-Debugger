import React, { Component } from 'react'

class ShowFlaggedAudio extends Component
{
  render()
  {
    return(
      <>
        <nav className="flaggedAudioList">
          <ul className="flaggedAudioList">
            {
              this.props.listItems.map(item =>
                (
                    <li key={ item.audio_filename }>
                      <p>
                        { item.audio_filename }
                        <span style={{margin: "10px"}} />
                        <button onClick={() => this.props.selectToModify(item)}>Modify Tags</button>
                        <span style={{margin: "10px"}} />
                        <button onClick={() => this.props.unflagAudio(item)}>Unflag</button>
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

export default ShowFlaggedAudio