import PropTypes from 'prop-types'
import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import styled from 'styled-components/macro'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileText } from 'styled-icons/icomoon/FileText'
import DeleteContent from './DeleteContent'

SongContent.propTypes = {
  lyrics: PropTypes.object
}

export default function SongContent({
  id,
  type,
  content,
  lyrics,
  tab,
  sound,
  isEditButtonActive,
  updateSongs
}) {
  const [areFilesVisible, setAreFilesVisible] = useState(false)

  function toggleFiles() {
    setAreFilesVisible(!areFilesVisible)
  }

  if (type === 'lyrics') {
    const lyricsFormated = lyrics.content
      .split('%')
      .map((line, index) => <li key={index}>{line}</li>)

    return (
      <section>
        {isEditButtonActive && (
          <DeleteContent
            id={id}
            content={content}
            lyrics={lyrics}
            updateSongs={updateSongs}
          ></DeleteContent>
        )}
        <LyricsFileStyled onClick={toggleFiles}></LyricsFileStyled>

        <h4>{lyrics.subtitle}</h4>

        {areFilesVisible && (
          <React.Fragment>
            {lyrics.isUploadedFile ? (
              <img src={lyrics.content} alt="" />
            ) : (
              <p>{lyricsFormated}</p>
            )}
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
        {isEditButtonActive && (
          <DeleteContent
            id={id}
            content={content}
            tab={tab}
            updateSongs={updateSongs}
          ></DeleteContent>
        )}
        <TabFileStyled onClick={toggleFiles}></TabFileStyled>

        <h4>{tab.subtitle}</h4>

        {areFilesVisible && (
          <React.Fragment>
            {tab.isUploadedFile ? (
              <img src={tab.content} alt="" />
            ) : (
              <p>{tabFormated}</p>
            )}
          </React.Fragment>
        )}
      </section>
    )
  } else {
    return (
      <section>
        {isEditButtonActive && (
          <DeleteContent
            id={id}
            content={content}
            sound={sound}
            updateSongs={updateSongs}
          ></DeleteContent>
        )}
        <AudioFileStyled onClick={toggleFiles}></AudioFileStyled>
        <h4>{sound.subtitle}</h4>

        {areFilesVisible && (
          <React.Fragment>
            <AudioPlayer src={sound.content} />
          </React.Fragment>
        )}
      </section>
    )
  }
}

const LyricsFileStyled = styled(FileText)`
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
