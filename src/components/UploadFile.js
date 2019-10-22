import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import loading from '../images/loading.gif'

UploadFile.propTypes = {
  setFileUrl: PropTypes.func,
  setSubtitle: PropTypes.func,
  onUpload: PropTypes.func
}

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

  return isUploadActive ? (
    <UploadStyled>
      <h3>File upload in progress. Please wait...</h3>{' '}
      <img src={loading} alt="Upload" />
    </UploadStyled>
  ) : (
    <FormStyled onSubmit={handleSubmit}>
      <label>
        Name your new file:
        <input autoFocus name="subtitle" placeholder="subtitle"></input>
      </label>
      <label>
        File:
        <input type="file" name="file"></input>
      </label>
      <button>upload</button>
    </FormStyled>
  )
}

const UploadStyled = styled.div`
  text-align: center;
  align-items: center;
  img {
    max-width: 100px;
  }
`

const FormStyled = styled.form`
  display: grid;
  grid-gap: 10px;

  label:nth-child(1) {
    margin: 5px;
    display: flex;
    flex-direction: column;
  }

  button {
    color: var(--darkblue);
    border-radius: 10px;
    background-color: var(--greywhite);
    height: 40px;
    width: 100%;
  }
`
