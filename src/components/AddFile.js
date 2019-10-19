import React, { useEffect, useState } from 'react'
import { patchSong } from '../services'
import ChooseFileTypeForm from './ChooseFileTypeForm'
import UploadFile from './UploadFile'

export default function AddFile({ id, content, updateSongs }) {
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
    <React.Fragment>
      <ChooseFileTypeForm
        setFileType={setFileType}
        setIsFormActive={setIsFormActive}
        setIsAddFileVisible={setIsAddFileVisible}
        isAddFileVisible={isAddFileVisible}
      ></ChooseFileTypeForm>
      {isFormActive && (
        <React.Fragment>
          <h3>
            New
            {' ' + fileType.slice(3)}
          </h3>
          {fileType !== 'newSound' && !isUploadFormActive && (
            <form type={fileType} onSubmit={handleSubmit}>
              <label>
                {' '}
                Name your new {' ' + fileType.slice(3)}-File:
                <input
                  autoFocus
                  name="subtitle"
                  type="text"
                  placeholder="subtitle"
                ></input>
              </label>
              <label>
                <textarea
                  name="content"
                  rows="10"
                  placeholder="Place your text here!"
                ></textarea>
              </label>
              <button>Add File</button>
              <button onClick={toggleFileUpload}>upload Image</button>
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
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
