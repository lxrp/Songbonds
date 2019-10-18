import PropTypes from 'prop-types'
import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import styled from 'styled-components/macro'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileText } from 'styled-icons/icomoon/FileText'

SongContent.propTypes = {
  text: PropTypes.object
}

export default function SongContent({ type, text, tab, sound }) {
  const [areFilesVisible, setAreFilesVisible] = useState(false)

  function toggleFiles() {
    setAreFilesVisible(!areFilesVisible)
  }

  if (type === 'lyrics') {
    const textFormated = text.content
      .split('%')
      .map((line, index) => <li key={index}>{line}</li>)

    return (
      <section>
        <TextFileStyled onClick={toggleFiles}></TextFileStyled>
        {areFilesVisible && (
          <React.Fragment>
            <h4>{text.subtitle}</h4>
            <p>{textFormated}</p>
          </React.Fragment>
        )}
      </section>
    )
  } else if (type === 'tab') {
    const tabFormated = tab.content
      .split('%')
      .map((line, index) => <li key={index}>{line}</li>)
    return (
      <section>
        <TabFileStyled onClick={toggleFiles}></TabFileStyled>
        {areFilesVisible && (
          <React.Fragment>
            <h4>{tab.subtitle}</h4>
            <p>{tabFormated}</p>
          </React.Fragment>
        )}
      </section>
    )
  } else {
    return (
      <section>
        <AudioFileStyled onClick={toggleFiles}></AudioFileStyled>
        {areFilesVisible && (
          <React.Fragment>
            <h4>{sound.subtitle}</h4>
            <AudioPlayer src={sound.content} />
          </React.Fragment>
        )}
      </section>
    )
  }
}

const TextFileStyled = styled(FileText)`
  height: 50px;
  width: 50px;
  color: green;
`

const TabFileStyled = styled(Guitar)`
  height: 50px;
  width: 50px;
  color: green;
`

const AudioFileStyled = styled(FileAudio)`
  height: 50px;
  width: 50px;
  color: green;
`
