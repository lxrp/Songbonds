import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { patchSong } from '../../services'
import ChooseFileTypeForm from './ChooseFileTypeForm'
import UploadFile from './UploadFile'

AddFile.propTypes = {
  id: PropTypes.string,
  content: PropTypes.object,
  updateSongs: PropTypes.func,
  setChosenEditForm: PropTypes.func,
  chosenEditForm: PropTypes.number
}

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
    setFileData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setChosenEditForm(0)
    updateSongs()
  }

  function setFileData() {
    const data = {
      subtitle: subtitle,
      content: fileUrl,
      timestamp: Date.now(),
      isUploadedFile: isUploadedFile
    }
    patchFile(data, fileType)
    setChosenEditForm(0)
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
    const newData = {
      ...data,
      timestamp: Date.now(),
      isUploadedFile: isUploadedFile
    }
    toggleForm()
    setChosenEditForm(0)
    patchFile(newData, type)
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
          <FormBoxStyled>
            <h3>
              New
              {' ' + fileType.slice(3)}
            </h3>
            {fileType !== 'newSound' && !isUploadFormActive && (
              <FormStyled type={fileType} onSubmit={handleSubmit}>
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
                  <p>No text to type? Upload an image instead:</p>
                  <button onClick={toggleFileUpload}>upload</button>
                </label>

                <SubmitButtonStyled>
                  submit {fileType.slice(3)}{' '}
                </SubmitButtonStyled>
              </FormStyled>
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

            <button onClick={cancel}>cancel</button>
          </FormBoxStyled>
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
const SubmitButtonStyled = styled.button`
  width: 100px;
  align-content: center;
`

const FormStyled = styled.form`
  display: grid;
  grid-template-rows: 100px 1fr 100px;
  grid-template-columns: 70% 30%;
  grid-column-gap: 10px;

  label:nth-child(1) {
    grid-row: 1/2;
    grid-column: 1/3;
    display: flex;
    flex-direction: column;
    align-content: left;
  }

  label:nth-child(2) {
    grid-row: 2/3;
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    align-content: left;
  }

  label:nth-child(3) {
    grid-row: 2/3;
    grid-column: 2/3;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
`

const FormBoxStyled = styled.section`
  display: grid;
  grid-template-rows: 50px auto 40px;
  grid-gap: 10px;

  h3 {
    grid-row: 1/2;
  }

  button {
    grid-row: 3/4;
  }
`
