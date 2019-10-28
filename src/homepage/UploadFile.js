import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import loading from '../images/loading.gif'

UploadFile.propTypes = {
  setFileUrl: PropTypes.func,
  setSubtitle: PropTypes.func,
  onUpload: PropTypes.func,
  fileType: PropTypes.string
}

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function UploadFile({
  setFileUrl,
  setSubtitle,
  onUpload,
  fileType
}) {
  const [isUploadActive, setIsUploadActive] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let fileToUpload = formData.get('file')
    const data = Object.fromEntries(formData)
    setSubtitle(data.subtitle)

    if (fileToUpload) {
      setIsUploadActive(!isUploadActive)
      upload(fileToUpload)
      event.target.reset()
    }
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

  return isUploadActive ? (
    <UploadStyled>
      <h3>File-upload in progress. Please wait...</h3>{' '}
      <img src={loading} alt="Upload" />
    </UploadStyled>
  ) : (
    <form onSubmit={handleSubmit}>
      <label>
        Name your new file:
        <input autoFocus name="subtitle" placeholder="subtitle"></input>
      </label>
      File:
      <label>
        {fileType === 'lyrics' || fileType === 'tab' ? (
          <input type="file" accept="image/*,.pdf" name="file"></input>
        ) : (
          <input type="file" accept="audio/*" name="file"></input>
        )}
      </label>
      <button>upload</button>
    </form>
  )
}

const UploadStyled = styled.div`
  text-align: center;
  align-items: center;
  img {
    max-width: 100px;
  }
`
