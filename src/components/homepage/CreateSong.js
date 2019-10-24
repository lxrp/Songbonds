import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle'
import { postSong } from '../../services'

CreateSong.propTypes = {
  updateSongs: PropTypes.func
}

export default function CreateSong({ updateSongs }) {
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
    postSong({ title: title }).then(updateSongs)
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
        <FormStyled onSubmit={handleSubmit}>
          <input
            autoFocus
            name="title"
            type="text"
            placeholder="Songtitle"
          ></input>

          <ButtonStyled>create Song</ButtonStyled>
          <ButtonStyled onClick={toggleSongForm}>Cancel</ButtonStyled>
        </FormStyled>
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
  width: ${item => (item.active ? '80vw' : '40vw')};
  padding: 0 10px 0 10px;
  display: flex;
  flex-direction: ${item => (item.active ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  border-radius: 10px;
  color: var(--greywhite);
  background-color: var(--darkblue);
`
const FormStyled = styled.form`
  background-color: var(--darkblue);
  display: grid;
  grid-gap: 10px;
  margin: 10px;
`
const ButtonStyled = styled.button`
  height: 40px;
  border-radius: 10px;
  color: var(--darkblue);
  background-color: var(--greywhite);
`
