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
  const isSongEmpty =
    content.lyrics.length === 0 &&
    content.tabs.length === 0 &&
    content.sounds.length === 0

  const [isSongContentVisible, setIsSongContentVisible] = useState(isSongEmpty)
  const [isToggleButtonActive, setIsToggleButtonActive] = useState(isSongEmpty)
  const [isEditButtonActive, setIsEditButtonActive] = useState(isSongEmpty)
  const [chosenEditForm, setChosenEditForm] = useState(0)

  function onClickToggleButton() {
    setIsToggleButtonActive(!isToggleButtonActive)
    setIsSongContentVisible(!isSongContentVisible)
    isToggleButtonActive &&
      isEditButtonActive &&
      setIsEditButtonActive(!isEditButtonActive)
  }

  function onClickEditButton() {
    setIsEditButtonActive(!isEditButtonActive)
    !isToggleButtonActive && onClickToggleButton()
  }

  function songContent(Component) {
    return ({ object, type, index }) => (
      <Component
        id={id}
        type={type}
        object={object}
        key={index}
        content={content}
        resetEditMode={onClickEditButton}
        isEditButtonActive={isEditButtonActive}
        updateSongs={updateSongs}
      ></Component>
    )
  }
  const SongContentByFileType = songContent(SongContent)

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
            active={isToggleButtonActive}
          >
            {isToggleButtonActive ? (
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
            setChosenEditForm={setChosenEditForm}
            resetEditMode={onClickEditButton}
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
            <SongContentByFileType
              object={lyrics}
              type={'lyrics'}
              index={index}
            ></SongContentByFileType>
          ))}
          {content.tabs.reverse().map((tabs, index) => (
            <SongContentByFileType
              object={tabs}
              type={'tabs'}
              index={index}
            ></SongContentByFileType>
          ))}
          {content.sounds.reverse().map((sounds, index) => (
            <SongContentByFileType
              object={sounds}
              type={'sounds'}
              index={index}
            ></SongContentByFileType>
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
  margin-top: 10px;
  text-align: left;
  color: var(--darkblue);
  padding: 10px;
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
  justify-content: space-around;
  align-items: top;
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
