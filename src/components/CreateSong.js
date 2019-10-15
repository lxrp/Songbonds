import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle'
import { postSong } from '../services'

export default function CreateSong({ onCreate }) {
  const [isSongFormActive, setIsSongFormActive] = useState(false)

  function openSongForm() {
    setIsSongFormActive(!isSongFormActive)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    createSong(data)
    openSongForm()
  }

  function createSong({ title }) {
    postSong({ title: title }).then(onCreate)
  }

  return (
    <section>
      <h3>add Song</h3>
      <CreateSongStyled onClick={openSongForm}></CreateSongStyled>
      {isSongFormActive && (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            name="title"
            type="text"
            placeholder="Songtitle"
          ></input>

          <button>Create Song</button>
        </form>
      )}
    </section>
  )
}

const CreateSongStyled = styled(PlusCircle)`
  height: 50px;
  width: 50px;
  color: green;
`
