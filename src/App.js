import React, { useState, useEffect } from 'react'
import Song from './components/Song'
import { getSongs, postSong } from './services'
import { PlusCircle } from 'styled-icons/boxicons-regular/PlusCircle'
import styled from 'styled-components/macro'
//import axios from 'axios'

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET

export default function App() {
  const [songs, setSongs] = useState([])
  const [createSongActive, setCreateSongActive] = useState(false)

  //  const [image, setImage] = useState('')

  useEffect(() => {
    getSongs().then(setSongs)
  }, [])

  /* 
 function upload(event) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`

    const formData = new FormData()
    formData.append('file', event.target.files[0])
    formData.append('upload_preset', PRESET)

    axios
      .post(url, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      .then(onFileSave)
      .catch(err => console.error(err))
  }

  function onFileSave(response) {
    setImage(response.data.url)
    console.log(response.data.url)
  }
  */

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    createSong(data)
  }

  function createSong({ title }) {
    postSong({ title: title })
  }

  function openSongForm() {
    setCreateSongActive(!createSongActive)
  }

  return (
    <reactFragment>
      <div>
        {songs.map(song => (
          <Song
            key={song._id}
            title={song.title}
            lyrics={song.lyrics}
            tabs={song.tabs}
            sounds={song.sounds}
          />
        ))}
      </div>
      {/*<div>
        {image ? (
          <img src={image} alt="" style={{ width: '100%' }} />
        ) : (
          <input type="file" name="file" onChange={upload} />
        )}
        </div>*/}

      <h3>add Song</h3>
      <CreateSongStyled onClick={openSongForm}></CreateSongStyled>
      {createSongActive && (
        <form onSubmit={handleSubmit}>
          {createSongActive && <input name="title" type="text"></input>}
          <button> Create Song</button>
        </form>
      )}
    </reactFragment>
  )
}
const CreateSongStyled = styled(PlusCircle)`
  height: 50px;
  width: 50px;
  color: green;
`
