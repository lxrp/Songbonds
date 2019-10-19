import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { UpArrow } from 'styled-icons/boxicons-regular/UpArrow'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'
import { Edit } from 'styled-icons/fa-regular/Edit'

import AddFile from './AddFile'
import SongContent from './SongContent'

export default function Song({ id, content, updateSongs }) {
  const [isSongContentVisible, setIsSongContentVisible] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)
  const [isEditButtonActive, setIsEditButtonActive] = useState(false)

  function onClickToggleButton() {
    setIsButtonActive(!isButtonActive)
    setIsSongContentVisible(!isSongContentVisible)
  }

  function onClickEditButton() {
    setIsEditButtonActive(!isEditButtonActive)
  }

  return (
    <SongStyled>
      <h2>{content.title}</h2>
      <EditButtonStyled onClick={onClickEditButton}></EditButtonStyled>
      <ToggleButtonStyled onClick={onClickToggleButton} active={isButtonActive}>
        {isButtonActive ? (
          <UpArrowStyled></UpArrowStyled>
        ) : (
          <DownArrowStyled></DownArrowStyled>
        )}
      </ToggleButtonStyled>

      {isSongContentVisible && (
        <section>
          {content.lyrics.map((lyrics, index) => (
            <SongContent
              id={id}
              type="lyrics"
              lyrics={lyrics}
              key={index}
              content={content}
              isEditButtonActive={isEditButtonActive}
              updateSongs={updateSongs}
            >
              {' '}
            </SongContent>
          ))}
          {content.tabs.map((tab, index) => (
            <SongContent
              id={id}
              type="tab"
              tab={tab}
              key={index}
              content={content}
              isEditButtonActive={isEditButtonActive}
              updateSongs={updateSongs}
            ></SongContent>
          ))}
          {content.sounds.map((sounds, index) => (
            <SongContent
              id={id}
              type="sound"
              sound={sounds}
              key={index}
              content={content}
              isEditButtonActive={isEditButtonActive}
              updateSongs={updateSongs}
            ></SongContent>
          ))}
          <AddFile
            id={id}
            content={content}
            updateSongs={updateSongs}
          ></AddFile>
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
const EditButtonStyled = styled(Edit)`
  height: 50px;
  width: 50px;
  color: green;
`
