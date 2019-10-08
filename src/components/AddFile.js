import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilePlus } from 'styled-icons/boxicons-solid/FilePlus'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileText } from 'styled-icons/icomoon/FileText'
import { patchSong } from '../services'

export default function AddFile() {
  const [isAddFileFormActive, setIsAddFileFormActive] = useState(false)

  function openFileForm() {
    setIsAddFileFormActive(!isAddFileFormActive)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    addFile(data)
  }

  function addFile() {
    patchSong({})
  }

  return (
    <section>
      <h3>add File</h3>
      <AddFileStyled onClick={openFileForm}></AddFileStyled>
      {isAddFileFormActive && (
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            name="subtitle"
            type="text"
            Placeholder="Songtitle"
          ></input>

          <button>Add File</button>
        </form>
      )}
    </section>
  )
}

const AddFileStyled = styled(FilePlus)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddLyricsStyled = styled(FileText)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddTabsStyled = styled(Guitar)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddAudioStyled = styled(FileAudio)`
  height: 50px;
  width: 50px;
  color: green;
`
