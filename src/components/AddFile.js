import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilePlus } from 'styled-icons/boxicons-solid/FilePlus'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileText } from 'styled-icons/icomoon/FileText'
import { patchSong } from '../services'

export default function AddFile({ id, lyrics, tabs, sounds }) {
  const [isAddFileVisible, setIsAddFileVisible] = useState(true)
  const [isAddFileFormActive, setIsAddFileFormActive] = useState(false)
  const [isFormActive, setIsFormActive] = useState(false)
  const [chosenForm, setChosenForm] = useState()

  function openFileForm() {
    setIsAddFileVisible(!isAddFileVisible)
    setIsAddFileFormActive(!isAddFileFormActive)
  }

  function AddLyric() {
    setIsAddFileFormActive(!isAddFileFormActive)
    setIsFormActive(!isFormActive)
    setChosenForm(() => {
      return (
        <React.Fragment>
          <h3>Add Lyrics</h3>
          <form onSubmit={handleSubmit}>
            <label>
              {' '}
              Subtitle for lyrics:
              <input
                autoFocus
                name="subtitle"
                type="text"
                placeholder="Songtitle"
              ></input>
            </label>
            <label>
              <textarea
                name="content"
                rows="10"
                placeholder="Place your lyrics here!"
              ></textarea>
              Type % for a line break
            </label>
            <button>Add File</button>
          </form>
        </React.Fragment>
      )
    })
  }

  function AddTab() {
    setIsAddFileFormActive(!isAddFileFormActive)
    setIsFormActive(!isFormActive)
    setChosenForm(() => {
      return <h3>Add Tab</h3>
    })
  }

  function AddSound() {
    setIsAddFileFormActive(!isAddFileFormActive)
    setIsFormActive(!isFormActive)
    setChosenForm(() => {
      return <h3>Add Sound</h3>
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    addFile(data)
  }

  function addFile(data) {
    lyrics = [...lyrics, data]
    console.log(lyrics)
    const lyricsToPatch = {
      lyrics: lyrics
    }
    patchSong(id, lyricsToPatch)

    console.log(lyrics)
  }

  return (
    <section>
      {isAddFileVisible && (
        <div>
          <h3>add File</h3>
          <AddFileStyled onClick={openFileForm}></AddFileStyled>
        </div>
      )}
      {isAddFileFormActive && (
        <div>
          <h2>Choose Filetype:</h2>
          <AddLyricStyled onClick={AddLyric}></AddLyricStyled>
          <AddTabStyled onClick={AddTab}></AddTabStyled>
          <AddSoundStyled onClick={AddSound}></AddSoundStyled>
          <button onClick={openFileForm}>Cancel</button>
        </div>
      )}
      {chosenForm}
    </section>
  )
}

const AddFileStyled = styled(FilePlus)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddLyricStyled = styled(FileText)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddTabStyled = styled(Guitar)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddSoundStyled = styled(FileAudio)`
  height: 50px;
  width: 50px;
  color: green;
`
