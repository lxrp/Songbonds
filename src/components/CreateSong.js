import React, { useState, useEffect } from 'react'
import { postSong } from '../services'
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle'
import styled from 'styled-components/macro'

export default function CreateSong() {
  const [createSongActive, setCreateSongActive] = useState(false)

  function openSongForm() {
    setCreateSongActive(!createSongActive)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    createSong(data)
  }

  function createSong({ title }) {
    postSong({ title: title })
  }

  return (
    <section>
      <h3>add Song</h3>
      <CreateSongStyled onClick={openSongForm}></CreateSongStyled>
      {createSongActive && (
        <form onSubmit={handleSubmit}>
          {createSongActive && <input name="title" type="text"></input>}
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
