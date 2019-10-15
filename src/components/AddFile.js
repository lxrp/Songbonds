import React, { useState } from 'react'
import { patchSong } from '../services'
import ChooseFileTypeForm from './ChooseFileTypeForm'
import UploadFile from './UploadFile'

export default function AddFile({ id, lyrics, tabs, sounds, updateSongs }) {
  const [isAddFileVisible, setIsAddFileVisible] = useState(true)
  const [fileType, setFileType] = useState()
  const [isFormActive, setIsFormActive] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [isUploadFormActive, setIsUploadFormActive] = useState(false)

  console.log(fileUrl)
  console.log(fileType)

  function toggleFileUpload() {
    setIsUploadFormActive(!isUploadFormActive)
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
            {fileType !== 'newSound' && (
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
          <button onClick={toggleFileUpload}>upload Image</button>

          {(fileType === 'newSound' || isUploadFormActive) && (
            <UploadFile setFileUrl={setFileUrl}> </UploadFile>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const type = event.currentTarget.getAttribute('type')
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)
    patchFile(data, type)
    setIsFormActive(!isFormActive)
    setIsAddFileVisible(!isAddFileVisible)
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
}
