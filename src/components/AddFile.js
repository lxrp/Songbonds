import React, { useEffect, useState } from 'react'
import { patchSong } from '../services'
import ChooseFileTypeForm from './ChooseFileTypeForm'
import UploadFile from './UploadFile'
import styled from 'styled-components/macro'

export default function AddFile({
  id,
  content,
  updateSongs,
  setChosenEditForm,
  chosenEditForm
}) {
  const [isAddFileVisible, setIsAddFileVisible] = useState(true)
  const [fileType, setFileType] = useState()
  const [isFormActive, setIsFormActive] = useState(false)
  const [isUploadFormActive, setIsUploadFormActive] = useState(false)
  const [subtitle, setSubtitle] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [isUploadedFile, setIsUploadedFile] = useState(false)

  useEffect(() => {
    setUrl()
  }, [fileUrl])

  function toggleFileUpload() {
    setIsUploadFormActive(!isUploadFormActive)
    setIsUploadedFile(!isUploadedFile)
  }

  function cancel() {
    setIsAddFileVisible(true)
    setIsFormActive(false)
    setIsUploadFormActive(false)
    setIsUploadedFile(false)
  }

  function setUrl() {
    const data = {
      subtitle: subtitle,
      content: fileUrl,
      isUploadedFile: isUploadedFile
    }
    patchFile(data, fileType)
  }

  function toggleForm() {
    setIsFormActive(!isFormActive)
    setIsAddFileVisible(!isAddFileVisible)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const type = event.currentTarget.getAttribute('type')
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    const newData = { ...data, isUploadedFile: isUploadedFile }
    patchFile(newData, type)
    toggleForm()
  }

  function patchFile(data, type) {
    let FileToPatch

    if (type === 'newLyrics') {
      content.lyrics = [...content.lyrics, data]
      FileToPatch = {
        lyrics: content.lyrics
      }
    } else if (type === 'newTab') {
      content.tabs = [...content.tabs, data]
      FileToPatch = {
        tabs: content.tabs
      }
    } else if (type === 'newSound') {
      content.sounds = [...content.sounds, data]
      FileToPatch = {
        sounds: content.sounds
      }
    }

    patchSong(id, FileToPatch).then(updateSongs)
  }

  return (
    chosenEditForm !== 2 && (
      <AddFileStyled>
        <ChooseFileTypeForm
          setFileType={setFileType}
          setIsFormActive={setIsFormActive}
          setIsAddFileVisible={setIsAddFileVisible}
          isAddFileVisible={isAddFileVisible}
          setChosenEditForm={setChosenEditForm}
          chosenEditForm={chosenEditForm}
        ></ChooseFileTypeForm>
        {isFormActive && (
          <FormStyled>
            <h3>
              New
              {' ' + fileType.slice(3)}
            </h3>
            {fileType !== 'newSound' && !isUploadFormActive && (
              <form type={fileType} onSubmit={handleSubmit}>
                <label>
                  {' '}
                  Name your new {' ' + fileType.slice(3)}-file:
                  <input
                    autoFocus
                    name="subtitle"
                    type="text"
                    placeholder="subtitle"
                  ></input>
                </label>

                <label>
                  Place your {fileType.slice(3)} here:
                  <textarea
                    name="content"
                    rows="10"
                    placeholder="Start to type!"
                  ></textarea>
                </label>

                <label>
                  No text to type? Upload an Image instead:
                  <button onClick={toggleFileUpload}>Upload</button>
                </label>

                <button>Submit {fileType.slice(3)} </button>
              </form>
            )}

            {(fileType === 'newSound' || isUploadFormActive) && (
              <UploadFile
                setFileUrl={setFileUrl}
                setSubtitle={setSubtitle}
                onUpload={toggleForm}
              >
                {' '}
              </UploadFile>
            )}

            <button onClick={cancel}>Cancel</button>
          </FormStyled>
        )}
      </AddFileStyled>
    )
  )
}

const AddFileStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const FormStyled = styled.section`
  display: grid;

  grid-template-rows: 50px 50px 1fr 40px 40px;
  grid-template-columns: 75% 25%;
  grid-template-areas:
    'headline headline'
    'subtitle subtitle'
    'textarea upload'
    'submitButton .'
    'cancelButton .';
  grid-gap: 10px;
  h3 {
    grid-area: headline;
  }

  label:nth-child(1) {
    grid-area: subtitle;
    display: flex;
    align-items: center;
    cursor: pointer;
    input {
      float: left;
      width: 100%;
    }
  }
  label:nth-child(2) {
    grid-area: textarea;
    display: flex;
    align-items: center;
    input {
      float: left;
      width: 100%;
    }
    cursor: pointer;
    button {
      grid-area: submitButton;
    }
  }
  label:nth-child(3) {
    grid-area: upload;
    background-color: black;
    cursor: pointer;
  }
  button {
    grid-area: cancelButton;
  }
`
