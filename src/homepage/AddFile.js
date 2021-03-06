import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { patchSong } from '../services'
import ChooseFileTypeForm from './ChooseFileTypeForm'
import UploadFile from './UploadFile'

AddFile.propTypes = {
  id: PropTypes.string,
  content: PropTypes.object,
  setChosenEditForm: PropTypes.func,
  resetEditMode: PropTypes.func,
  chosenEditForm: PropTypes.number
}

export default function AddFile({
  id,
  content,
  setChosenEditForm,
  resetEditMode,
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
    resetEditMode()
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

    if (type === 'lyrics') {
      content.lyrics = [...content.lyrics, data]
      FileToPatch = {
        lyrics: content.lyrics
      }
    } else if (type === 'tab') {
      content.tabs = [...content.tabs, data]
      FileToPatch = {
        tabs: content.tabs
      }
    } else if (type === 'sound') {
      content.sounds = [...content.sounds, data]
      FileToPatch = {
        sounds: content.sounds
      }
    }

    patchSong(id, FileToPatch)
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
          <React.Fragment>
            <h3>
              New
              {' ' + fileType}
            </h3>
            {fileType !== 'sound' && !isUploadFormActive && (
              <form type={fileType} onSubmit={handleSubmit}>
                <label>
                  {' '}
                  Name your new {' ' + fileType}-file:
                  <input
                    autoFocus
                    name="subtitle"
                    type="text"
                    placeholder="subtitle"
                  ></input>
                </label>

                <label>
                  Place your {fileType} here:
                  <textarea
                    name="content"
                    rows="10"
                    placeholder="Start to type!"
                  ></textarea>
                </label>

                <button>submit {fileType} </button>

                <UploadBoxStyled>
                  <p>No text to type? Upload an image instead:</p>
                  <button onClick={toggleFileUpload}>upload</button>
                </UploadBoxStyled>
              </form>
            )}

            {(fileType === 'sound' || isUploadFormActive) && (
              <UploadFile
                fileType={fileType}
                setFileUrl={setFileUrl}
                setSubtitle={setSubtitle}
                onUpload={toggleForm}
              >
                {' '}
              </UploadFile>
            )}

            <CancelButtonStyled onClick={cancel}>cancel</CancelButtonStyled>
          </React.Fragment>
        )}
      </AddFileStyled>
    )
  )
}

const AddFileStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  button {
    align-self: center;
    max-width: 200px;
    width: 100%;
  }
`

const UploadBoxStyled = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-align: center;
  button {
    align-self: center;
    margin-top: 0px;
  }
`
const CancelButtonStyled = styled.button`
  margin-top: 20px;
`
