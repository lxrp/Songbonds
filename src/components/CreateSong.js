import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle'
import { postSong } from '../services'

export default function CreateSong({ updatePage }) {
  const [createSongActive, setCreateSongActive] = useState(false)

  function openSongForm() {
    setCreateSongActive(!createSongActive)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    createSong(data)
    return { updatePage }
  }

  function createSong({ title }) {
    postSong({ title: title }).then(() => updatePage)
  }

  return (
    <section>
      <h3>add Song</h3>
      <CreateSongStyled onClick={openSongForm}></CreateSongStyled>
      {createSongActive && (
        <form onSubmit={handleSubmit}>
          {createSongActive && (
            <input
              autoFocus
              name="title"
              type="text"
              Placeholder="Songtitle"
            ></input>
          )}
          <button> Create Song</button>
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
