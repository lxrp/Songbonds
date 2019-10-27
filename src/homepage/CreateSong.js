import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle'
import { postSong } from '../services'

CreateSong.propTypes = {
  updateSongs: PropTypes.func,
  activeUser: PropTypes.object
}

export default function CreateSong({ updateSongs, activeUser }) {
  const [isSongFormActive, setIsSongFormActive] = useState(false)

  function toggleSongForm() {
    setIsSongFormActive(!isSongFormActive)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    createSong(data)
    toggleSongForm()
  }

  function createSong({ title }) {
    postSong({ title: title, author: activeUser._id }).then(updateSongs)
  }

  return (
    <CreateSongStyled active={isSongFormActive}>
      <h3>Add new Song:</h3>
      <CreateSongButtonStyled
        active={isSongFormActive}
        onClick={toggleSongForm}
      >
        {' '}
      </CreateSongButtonStyled>
      {isSongFormActive && (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            name="title"
            type="text"
            placeholder="Songtitle"
          ></input>

          <ButtonStyled>create Song</ButtonStyled>
          <ButtonStyled onClick={toggleSongForm}>cancel</ButtonStyled>
        </form>
      )}
    </CreateSongStyled>
  )
}

const CreateSongButtonStyled = styled(PlusCircle)`
  display: ${item => (item.active ? 'none' : 'block')};
  width: 40px;
  color: var(--greywhite);
  cursor: pointer;
`
const CreateSongStyled = styled.section`
  width: 100%;
  padding: 0 10px 0 10px;
  display: flex;
  flex-direction: ${item => (item.active ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: var(--greywhite);
  background-color: var(--darkblue);

  input {
    font-size: 1.5em;
    border-radius: 7px;
    cursor: pointer;
  }
`

const ButtonStyled = styled.button`
  width: 100%;
`
