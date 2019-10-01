import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import AudioPlayer from 'react-h5-audio-player'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'
import { UpArrow } from 'styled-icons/boxicons-regular/UpArrow'
import { FileText2 } from 'styled-icons/icomoon/FileText2'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileAudio } from 'styled-icons/fa-regular/FileAudio'

Song.propTypes = {
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.string,
  tabs: PropTypes.string,
  sound: PropTypes.string
}

Song.defaultProps = {
  title: '(No title)'
}

export default function Song({ key, title, lyrics, tabs, sounds }) {
  const [isSongContentVisible, setIsSongContentVisible] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [areTextFilesVisible, setAreTextFilesVisible] = useState(false)
  const [areTabFilesVisible, setAreTabFilesVisible] = useState(false)
  const [areAudioFilesVisible, setAreAudioFilesVisible] = useState(false)

  function onClickToggleButton() {
    setIsButtonActive(!isButtonActive)
    setIsSongContentVisible(!isSongContentVisible)
  }

  function toggleTextFiles() {
    setAreTextFilesVisible(!areTextFilesVisible)
  }

  function toggleTabFiles() {
    setAreTabFilesVisible(!areTabFilesVisible)
  }

  function toggleAudioFiles() {
    setAreAudioFilesVisible(!areAudioFilesVisible)
  }

  return (
    <SongStyled>
      <h2>{title}</h2>
      <ToggleButtonStyled onClick={onClickToggleButton} active={isButtonActive}>
        {isButtonActive ? (
          <UpArrowStyled></UpArrowStyled>
        ) : (
          <DownArrowStyled></DownArrowStyled>
        )}
      </ToggleButtonStyled>
      {isSongContentVisible && (
        <section>
          <TextFileStyled onClick={toggleTextFiles}></TextFileStyled>
          {areTextFilesVisible && (
            <p>
              {lyrics.split('/&').map(line => (
                <li>{line}</li>
              ))}
            </p>
          )}

          <TabFileStyled onClick={toggleTabFiles}></TabFileStyled>
          {areTabFilesVisible && (
            <p>{tabs && tabs.split('/&').map(line => <li>{line}</li>)}</p>
          )}

          <AudioFileStyled onClick={toggleAudioFiles}></AudioFileStyled>
          {areAudioFilesVisible && (
            <p>
              <AudioPlayer src={require('' + sounds)} />
            </p>
          )}
        </section>
      )}
    </SongStyled>
  )
}

const SongStyled = styled.article`
  border: 2px solid;
  background-color: darkgray;
  margin: 10px;
  padding: 10px;
  list-style: none;
  position: relative;
`

const ToggleButtonStyled = styled.div`
  border: 2px solid black;
  right: 10px;
  top: 5px;
  position: absolute;
  background-color: ${item => (item.active ? 'darkgray' : 'lightgray')};
`

const DownArrowStyled = styled(DownArrow)`
  height: 50px;
  width: 50px;
  color: green;
`
const UpArrowStyled = styled(UpArrow)`
  height: 50px;
  width: 50px;
  color: green;
`
const TextFileStyled = styled(FileText2)`
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
