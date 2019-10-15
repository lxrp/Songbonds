import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilePlus } from 'styled-icons/boxicons-solid/FilePlus'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileText } from 'styled-icons/icomoon/FileText'
import { patchSong } from '../services'
import UploadFile from './UploadFile'

export default function AddFile({ id, lyrics, tabs, sounds, updateSongs }) {
  const [isAddFileVisible, setIsAddFileVisible] = useState(true)
  const [isAddFileFormActive, setIsAddFileFormActive] = useState(false)
  const [isFormActive, setIsFormActive] = useState(false)
  const [renderForm, setRenderForm] = useState()

  function openFileForm() {
    setIsAddFileVisible(!isAddFileVisible)
    setIsAddFileFormActive(!isAddFileFormActive)
  }

  function submitFile(event) {
    setIsAddFileFormActive(!isAddFileFormActive)
    setIsFormActive(!isFormActive)

    const dataType = event.currentTarget.getAttribute('name')

    setRenderForm(() => {
      return (
        <React.Fragment>
          <h3>
            New
            {' ' + dataType.slice(3)}
          </h3>
          <form type={dataType} onSubmit={handleSubmit}>
            <label>
              {' '}
              Name your new {' ' + dataType.slice(3)}-File:
              <input
                autoFocus
                name="subtitle"
                type="text"
                placeholder="subtitle"
              ></input>
            </label>
            {dataType !== 'newSound' && (
              <label>
                <textarea
                  name="content"
                  rows="10"
                  placeholder="Place your text here!"
                ></textarea>
              </label>
            )}
            <button>Add File</button>
          </form>
          <UploadFile></UploadFile>
        </React.Fragment>
      )
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const type = event.currentTarget.getAttribute('type')
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    patchFile(data, type)
    setRenderForm()
    openFileForm()
  }

  function patchFile(data, type) {
    let FileToPatch

    if (type === 'newLyrics') {
      lyrics = [...lyrics, data]
      FileToPatch = {
        lyrics: lyrics
      }
    } else if (type === 'newTab') {
      tabs = [...tabs, data]
      FileToPatch = {
        tabs: tabs
      }
    } else {
      sounds = [...sounds, data]
      FileToPatch = {
        sounds: sounds
      }
    }

    patchSong(id, FileToPatch).then(updateSongs)
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
          <AddLyricStyled
            name="newLyrics"
            onClick={submitFile}
          ></AddLyricStyled>
          <AddTabStyled name="newTab" onClick={submitFile}></AddTabStyled>
          <AddSoundStyled name="newSound" onClick={submitFile}></AddSoundStyled>
          <button onClick={openFileForm}>Cancel</button>
        </div>
      )}
      {renderForm}
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
