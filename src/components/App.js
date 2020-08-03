import React, { Component } from 'react';
import '../css/App.css';

import ShowCoOccurrence from './ShowCoOccurrence'
import ShowAgreement from './ShowAgreement'
import ShowList from "./ShowList"
import ShowTags from "./ShowTags"
import ShowFlaggedAudio from "./ShowFlaggedAudio"
import ModifyTags from './ModifyTags';

class App extends Component
{
  constructor()
  {
    super();
    this.state = 
    {
      currentMap: 'Co-Occurrence',
      CoOccurrenceMap: [],
      CoOcurrenceLastIndex: 0,
      AgreementMap: [],
      AgreementLastIndex: 0,
      label1: null,
      label2: null,
      count: null,
      agreement: null,
      allInstances: [],
      currentInstances: [],
      selectedLabel1: null,
      selectedLabel2: null,
      selectedAudio1: null,
      selectedAudioName1: null,
      seletedAudioTags1: [],
      flaggedAudio: new Map(),
      selectedAudio2: null,
      selectedAudioName2: null,
      selectedAudioTags2: []
    }

    this.toggleMaps = this.toggleMaps.bind(this)
    this.logCoOccurrenceData = this.logCoOccurrenceData.bind(this)
    this.logAgreementData = this.logAgreementData.bind(this)
    this.filterCurrentInstances = this.filterCurrentInstances.bind(this)
    this.extractTags = this.extractTags.bind(this)
    this.logCurrentTags = this.logCurrentTags.bind(this)
    this.flagAudio = this.flagAudio.bind(this)
    this.unflagAudio = this.unflagAudio.bind(this)
    this.selectToModify = this.selectToModify.bind(this)
  }

  componentDidMount()
  {
    fetch('./Co-Occurrence Heat Map.json')
      .then(response => response.json())
      .then(result =>
          {
            let data = result.map(item =>
              {
                item.ID = this.state.CoOcurrenceLastIndex
                this.setState({ CoOcurrenceLastIndex: this.state.CoOcurrenceLastIndex + 1 })
                return item
              })
            this.setState({ CoOccurrenceMap: data })
          })
    
    fetch('./Agreement Heat Map.json')
      .then(response => response.json())
      .then(result =>
        {
          let data = result.map(item =>
            {
              item.ID = this.state.AgreementLastIndex
              this.setState({ AgreementLastIndex: this.state.AgreementLastIndex + 1 })
              return item
            })
          this.setState({ AgreementMap: data })
        })

    fetch('Instances.json')
      .then(response => response.json())
      .then(result =>
        {
            this.setState({ allInstances: result })
        })    
  }

  toggleMaps()
  {
	  const currMap = this.state.currentMap
	  let newMap = (currMap === 'Co-Occurrence') ? 'Agreement' : 'Co-Occurrence'
	  this.setState
	  (
		  {
			  currentMap: newMap
		  }
	  )
  }

  logCoOccurrenceData (currLabel1, currLabel2, currCount)
  {
      this.setState(
        {
          label1: currLabel1,
          label2: currLabel2,
          count: currCount,
          agreement: null
        }
      )
  }

  logAgreementData (currLabel1, currLabel2, currAgreement)
  {
      this.setState(
        {
          label1: currLabel1,
          label2: currLabel2,
          agreement: currAgreement,
          count: null
        }
      )
  }

  extractTags(item)
  {
    let allIns = this.state.allInstances
    allIns = allIns.filter(audio =>
    {
      return audio.audio_filename === item.audio_filename
    })

    let mySet = new Set()
    let tags = []
    allIns.map(audio =>
    {
      for (let tag in audio)
      {
        if (audio[tag] === 1)
        {
          if (!mySet.has(tag))
          {
            mySet.add(tag)
            tags.push(
              {
                "tag": tag
              }
            )
          }
        }
      }
      return null
    })
    return tags
  }

  logCurrentTags(item)
  {
    this.setState({ selectedAudio1: item })
    this.setState({ selectedAudioName1: item.audio_filename })

    let currTags = this.extractTags(item)
    this.setState({ selectedAudioTags1: currTags })
  }

  filterCurrentInstances(currLabel1, currLabel2)
  {
    this.setState({ selectedLabel1: currLabel1})
    this.setState({ selectedLabel2: currLabel2})
    let filteredInstances = this.state.allInstances
    let mySet = new Set()
    filteredInstances = filteredInstances.filter(item => 
      {
        if (mySet.has(item.audio_filename))
        {
          return false
        }
        else if ((item[currLabel1] === 1) && (item[currLabel2] === 1))
        {
          mySet.add(item.audio_filename)
          return true
        }
        return false
      })
    this.setState({ currentInstances: filteredInstances })
  }

  flagAudio(instance)
  {
    let currFlagged = this.state.flaggedAudio
    if (!currFlagged.has(instance.audio_filename))
    {
      currFlagged.set(instance.audio_filename, instance)
      this.setState({ flaggedAudio: currFlagged })
    }
  }

  unflagAudio(instance)
  {
    let currFlagged = this.state.flaggedAudio
    if (currFlagged.has(instance.audio_filename))
    {
      currFlagged.delete(instance.audio_filename)
      this.setState({ flaggedAudio: currFlagged })
    }
  }

  selectToModify(item)
  {
    this.setState({ selectedAudio2: item })
    this.setState({ selectedAudioName2: item.audio_filename })

    let tags = this.extractTags(item)
    this.setState({ selectedAudioTags2: tags})
  }

  render()
  {
    const map = this.state.currentMap
    const flaggedArray = Array.from(this.state.flaggedAudio.values())

    return(
      <>
        <button type="button" onClick={this.toggleMaps}>
          Toggle Heat Map
        </button>

        <div className="firstRow">
          {
            map === 'Co-Occurrence' ? (
              <div className="column firstLeft">
                <h2>Co-Occurrence Heat Map</h2>
                <h4>Label1: {this.state.label1} Label2: {this.state.label2} Count: {this.state.count}</h4>
                <ShowCoOccurrence 
                data={ this.state.CoOccurrenceMap }
                logCoOccurrenceData={ this.logCoOccurrenceData }
                filterCurrentInstances={ this.filterCurrentInstances }/>
              </div>
            ) : map === 'Agreement' ? (
              <div className="column firstLeft">
                <h2>Agreement Heat Map</h2>
                <h4>Label1: {this.state.label1} Label2: {this.state.label2} Agreement: {this.state.agreement}</h4>
                <ShowAgreement 
                data={ this.state.AgreementMap }
                logAgreementData={ this.logAgreementData }
                filterCurrentInstances={ this.filterCurrentInstances }/>
              </div>
            ) : null
          }

          <div className="column firstMiddle">
            <h2>Audio List</h2>
            <h4>Showing audio clips labeled "{this.state.selectedLabel1}" and "{this.state.selectedLabel2}"</h4>
            <ShowList
            listItems={ this.state.currentInstances }
            logCurrentTags={ this.logCurrentTags }
            flagAudio = { this.flagAudio }/>
          </div>

          <div className="column firstRight">
            <h2>Tags List</h2>
            <h4>Showing tags for { this.state.selectedAudioName1 }</h4>
            <ShowTags
            tags={ this.state.selectedAudioTags1 }
            />
          </div>
        </div>

        <div className="secondRow">

          <div className="column secondLeft">
            <h2>Flagged Audio List</h2>
            <ShowFlaggedAudio 
            listItems={ flaggedArray }
            unflagAudio={ this.unflagAudio }
            selectToModify={ this.selectToModify }
            />
          </div>

          <div className="column secondRight">
            <h2>Modifying Tags for {this.state.selectedAudioName2}</h2>
            <ModifyTags
            item={ this.state.selectedAudio2 }
            />
          </div>

        </div>
      </>
    );
  }
}

export default App;
