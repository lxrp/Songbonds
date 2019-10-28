import PropTypes from 'prop-types'
import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import styled from 'styled-components/macro'
import { FileAlt } from 'styled-icons/fa-solid/FileAlt'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import DeleteContent from './DeleteContent'
import Timestamp from './Timestamp'

SongContent.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  content: PropTypes.object,
  object: PropTypes.object,
  isEditButtonActive: PropTypes.bool,
  updateSongs: PropTypes.func,
  resetEditMode: PropTypes.func
}

export default function SongContent({
  id,
  type,
  content,
  object,
  isEditButtonActive,
  updateSongs,
  resetEditMode
}) {
  const [areFilesVisible, setAreFilesVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)

  function toggleFiles() {
    setAreFilesVisible(!areFilesVisible)
    setIsActive(!isActive)
  }

  function deleteContent(Component) {
    return ({ type, contentToDelete }) => (
      <Component
        id={id}
        content={content}
        type={type}
        contentToDelete={contentToDelete}
        updateSongs={updateSongs}
        resetEditMode={resetEditMode}
      ></Component>
    )
  }
  const DeleteContentWithType = deleteContent(DeleteContent)

  function fileIcons(Component) {
    return () => <Component active={isActive} onClick={toggleFiles}></Component>
  }
  const FileIconLyrics = fileIcons(LyricsFileStyled)
  const FileIconTab = fileIcons(TabFileStyled)
  const FileIconSound = fileIcons(AudioFileStyled)

  function songContent(Component) {
    return () => (
      <Component active={isEditButtonActive}>
        {isEditButtonActive && (
          <DeleteContentWithType
            type={type}
            contentToDelete={object}
          ></DeleteContentWithType>
        )}
        <div>
          {type === 'lyrics' && <FileIconLyrics />}
          {type === 'tabs' && <FileIconTab />}
          {type === 'sounds' && <FileIconSound />}
        </div>

        <SubtitleBoxStyled>
          <h4>{object.subtitle}</h4>
          <Timestamp fileType={object}></Timestamp>
        </SubtitleBoxStyled>

        {areFilesVisible &&
          (type === 'sounds' ? (
            <article>
              <AudioPlayerStyled src={object.content} />
            </article>
          ) : (
            <article>
              {object.isUploadedFile ? (
                <ImageStyled src={object.content} alt="" />
              ) : (
                <p>
                  <TextStyled> {object.content} </TextStyled>
                </p>
              )}
            </article>
          ))}
      </Component>
    )
  }

  const SongContentByFileType = songContent(SongContentStyled)

  return <SongContentByFileType></SongContentByFileType>
}

const ImageStyled = styled.img`
  max-width: 100%;
`

const TextStyled = styled.span`
  white-space: pre-line;
`

const SongContentStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  padding: 5px;
  article {
    flex-basis: 100%;
  }
`
const SubtitleBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    margin-bottom: 3px;
  }
  p {
    margin-top: 0;
    font-size: 0.5em;
  }
`

const LyricsFileStyled = styled(FileAlt)`
  width: 40px;
  margin-right: 10px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`

const TabFileStyled = styled(Guitar)`
  width: 40px;
  margin-right: 10px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`

const AudioFileStyled = styled(FileAudio)`
  width: 40px;
  margin-right: 10px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`
const AudioPlayerStyled = styled(AudioPlayer)`
  margin-top: 10px;
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
