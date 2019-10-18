import axios from 'axios'
import React, { useState } from 'react'
import loading from '../images/loading.gif'

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function UploadFile({ setFileUrl, setSubtitle, onUpload }) {
  let [isUploadActive, setIsUploadActive] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setIsUploadActive(!isUploadActive)
    const formData = new FormData(event.target)
    let fileToUpload = formData.get('file')
    const data = Object.fromEntries(formData)
    setSubtitle(data.subtitle)
    upload(fileToUpload)
    event.target.reset()
  }

  function upload(file) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', PRESET)

    return axios
      .post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(onFileSave)
      .catch(err => console.error(err))
  }

  function onFileSave(response) {
    setFileUrl(response.data.url)
    onUpload()
  }

  console.log(isUploadActive)

  return isUploadActive ? (
    <div>
      <h1>loading</h1> <img src={loading} alt="Upload" />
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <label>
        Name your new File:
        <input autoFocus name="subtitle" placeholder="subtitle"></input>
      </label>
      <label>
        File:
        <input type="file" name="file"></input>
      </label>
      <button>Upload</button>
    </form>
  )
}
