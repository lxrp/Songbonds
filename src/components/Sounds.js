import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import AudioPlayer from 'react-h5-audio-player'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'

Sounds.propTypes = {
  sound: PropTypes.object
}

export default function Sounds({ sound }) {
  const [areAudioFilesVisible, setAreAudioFilesVisible] = useState(false)

  function toggleAudioFiles() {
    setAreAudioFilesVisible(!areAudioFilesVisible)
  }
  return (
    <section>
      <AudioFileStyled onClick={toggleAudioFiles}></AudioFileStyled>
      {areAudioFilesVisible && (
        <React.Fragment>
          <h4>{sound.subtitle}</h4>

          <AudioPlayer src={require('' + sound.content)} />
        </React.Fragment>
      )}
    </section>
  )
}

const AudioFileStyled = styled(FileAudio)`
  height: 50px;
  width: 50px;
  color: green;
`
