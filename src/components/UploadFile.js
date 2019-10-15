import React from 'react'
import axios from 'axios'

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function UploadFile({ setFileUrl }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let fileToUpload = formData.get('file')
    upload(fileToUpload)
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        File:
        <input type="file" name="file"></input>
      </label>
      <button>Upload</button>
    </form>
  )
}
