import PropTypes from 'prop-types'
import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import styled from 'styled-components/macro'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileAlt } from 'styled-icons/fa-solid/FileAlt'

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
  const [isActive, setIsActive] = useState(false)

  function toggleFiles() {
    setAreFilesVisible(!areFilesVisible)
    setIsActive(!isActive)
  }

  if (type === 'lyrics') {
    const lyricsFormated = lyrics.content
      .split('%')
      .map((line, index) => <li key={index}>{line}</li>)

    return (
      <SongContentStyled active={isEditButtonActive}>
        {isEditButtonActive && (
          <DeleteContent
            id={id}
            content={content}
            lyrics={lyrics}
            updateSongs={updateSongs}
          ></DeleteContent>
        )}
        <div>
          <LyricsFileStyled
            active={isActive}
            onClick={toggleFiles}
          ></LyricsFileStyled>
        </div>
        <h4>{lyrics.subtitle}</h4>

        {areFilesVisible && (
          <article>
            {lyrics.isUploadedFile ? (
              <img src={lyrics.content} alt="" />
            ) : (
              <p>{lyricsFormated}</p>
            )}
          </article>
        )}
      </SongContentStyled>
    )
  } else if (type === 'tab') {
    const tabFormated = tab.content
      .split('%')
      .map((line, index) => <li key={index}>{line}</li>)
    return (
      <SongContentStyled active={isEditButtonActive}>
        {isEditButtonActive && (
          <DeleteContent
            id={id}
            content={content}
            tab={tab}
            updateSongs={updateSongs}
          ></DeleteContent>
        )}
        <div>
          <TabFileStyled
            active={isActive}
            onClick={toggleFiles}
          ></TabFileStyled>
        </div>
        <h4>{tab.subtitle}</h4>

        {areFilesVisible && (
          <article>
            {tab.isUploadedFile ? (
              <img src={tab.content} alt="" />
            ) : (
              <p>{tabFormated}</p>
            )}
          </article>
        )}
      </SongContentStyled>
    )
  } else {
    return (
      <SongContentStyled active={isEditButtonActive}>
        {isEditButtonActive && (
          <DeleteContent
            id={id}
            content={content}
            sound={sound}
            updateSongs={updateSongs}
          ></DeleteContent>
        )}
        <div>
          <AudioFileStyled
            active={isActive}
            onClick={toggleFiles}
          ></AudioFileStyled>
        </div>
        <h4>{sound.subtitle}</h4>

        {areFilesVisible && (
          <article>
            <AudioPlayerStyled src={sound.content} />
          </article>
        )}
      </SongContentStyled>
    )
  }
}
const SongContentStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
  flex-direction: row;
  article {
    flex-basis: 100%;
  }
`

const LyricsFileStyled = styled(FileAlt)`
  height: 50px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`

const TabFileStyled = styled(Guitar)`
  height: 50px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`

const AudioFileStyled = styled(FileAudio)`
  height: 50px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`
const AudioPlayerStyled = styled(AudioPlayer)`
  .toggle-play-button {
    background-color: var(--orange) !important;
  }
  .pause-icon {
    box-shadow: var(--orange) !important;
  }
  .indicator .volumn {
    background: var(--orange) !important;
  }
`
