import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'
import { UpArrow } from 'styled-icons/boxicons-solid/UpArrow'
import { Edit } from 'styled-icons/fa-regular/Edit'
import AddFile from './AddFile'
import DeleteSong from './DeleteSong'
import SongContent from './SongContent'

Song.propTypes = {
  id: PropTypes.string,
  content: PropTypes.object,
  updateSongs: PropTypes.func
}

export default function Song({ id, content, updateSongs }) {
  const hasSongContent =
    content.lyrics.length === 0 &&
    content.tabs.length === 0 &&
    content.sounds.length === 0

  const [isSongContentVisible, setIsSongContentVisible] = useState(
    hasSongContent
  )
  const [isButtonActive, setIsButtonActive] = useState(hasSongContent)
  const [isEditButtonActive, setIsEditButtonActive] = useState(hasSongContent)
  const [chosenEditForm, setChosenEditForm] = useState(0)

  function onClickToggleButton() {
    setIsButtonActive(!isButtonActive)
    setIsSongContentVisible(!isSongContentVisible)
  }

  function onClickEditButton() {
    setIsEditButtonActive(!isEditButtonActive)
    !isButtonActive && onClickToggleButton()
  }

  return (
    <SongStyled>
      <SongTitleBarStyled>
        <h2>{content.title}</h2>
        <ButtonBoxStyled>
          <EditButtonStyled
            onClick={onClickEditButton}
            active={isEditButtonActive}
          ></EditButtonStyled>
          <ToggleButtonStyled
            onClick={onClickToggleButton}
            active={isButtonActive}
          >
            {isButtonActive ? (
              <UpArrowStyled></UpArrowStyled>
            ) : (
              <DownArrowStyled></DownArrowStyled>
            )}
          </ToggleButtonStyled>
        </ButtonBoxStyled>
      </SongTitleBarStyled>
      {isEditButtonActive && (
        <EditBarStyled active={chosenEditForm === 1}>
          <AddFile
            id={id}
            content={content}
            updateSongs={updateSongs}
            setChosenEditForm={setChosenEditForm}
            chosenEditForm={chosenEditForm}
          ></AddFile>
          <DeleteSong
            id={id}
            updateSongs={updateSongs}
            setChosenEditForm={setChosenEditForm}
            chosenEditForm={chosenEditForm}
          ></DeleteSong>
        </EditBarStyled>
      )}

      {isSongContentVisible && (
        <section>
          {content.lyrics.reverse().map((lyrics, index) => (
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
          {content.tabs.reverse().map((tab, index) => (
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
          {content.sounds.reverse().map((sounds, index) => (
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
        </section>
      )}
    </SongStyled>
  )
}
const SongStyled = styled.article`
  border: 1px var(--darkblue) solid;
  box-shadow: 3px 3px 3px var(--darkblue);
  border-radius: 10px;
  background-color: var(--greywhite);
  margin: 10px;
  padding: 5px;
  list-style: none;
  text-align: left;
  color: var(--darkblue);
`

const SongTitleBarStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ButtonBoxStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const EditBarStyled = styled.div`
  border: 2px solid var(--orange);
  display: flex;
  justify-content: ${item => (item.active ? 'center' : 'space-around')};
  align-items: top;
  padding: 10px;
  border-radius: 10px;
  color: var(--greywhite);
  background-color: var(--darkblue);
`
const ToggleButtonStyled = styled.div`
  cursor: pointer;
`
const DownArrowStyled = styled(DownArrow)`
  height: 50px;
  width: 50px;
  color: var(--darkblue);
  cursor: pointer;
`
const UpArrowStyled = styled(UpArrow)`
  height: 50px;
  width: 50px;
  color: var(--orange);
  cursor: pointer;
`
const EditButtonStyled = styled(Edit)`
  height: 40px;
  width: 40px;
  color: ${item => (item.active ? 'var(--orange)' : 'var(--darkblue)')};
  cursor: pointer;
`
