import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { patchSong } from '../services'
import { DeleteForever } from 'styled-icons/material/DeleteForever'

export default function DeleteContent({
  id,
  content,
  lyrics,
  tab,
  sound,
  updateSongs
}) {
  const [isConfirmationActive, setIsConfirmationActive] = useState(false)

  function toggleDeletion() {
    setIsConfirmationActive(!isConfirmationActive)
  }

  function deleteFile() {
    let FileToPatch

    if (lyrics != null) {
      const indexToDelete = content.lyrics.findIndex(
        element => element === lyrics
      )
      const newData = [
        ...content.lyrics.slice(0, indexToDelete),
        ...content.lyrics.slice(indexToDelete + 1)
      ]
      FileToPatch = { lyrics: newData }
    } else if (tab != null) {
      const indexToDelete = content.tabs.findIndex(element => element === tab)
      const newData = [
        ...content.tabs.slice(0, indexToDelete),
        ...content.tabs.slice(indexToDelete + 1)
      ]
      FileToPatch = { tabs: newData }
    } else if (sound != null) {
      const indexToDelete = content.sounds.findIndex(
        element => element === sound
      )
      const newData = [
        ...content.sounds.slice(0, indexToDelete),
        ...content.sounds.slice(indexToDelete + 1)
      ]
      FileToPatch = { sounds: newData }
    }
    patchSong(id, FileToPatch).then(updateSongs)
    toggleDeletion()
  }

  return !isConfirmationActive ? (
    <DeleteButtonStyled onClick={toggleDeletion}></DeleteButtonStyled>
  ) : (
    <ConfirmationWindowStyled>
      <h3>Do you really want to delete this file?</h3>
      <button onClick={deleteFile}>Yes</button>
      <button onClick={toggleDeletion}>No</button>
    </ConfirmationWindowStyled>
  )
}

const DeleteButtonStyled = styled(DeleteForever)`
  height: 50px;
  width: 50px;
  color: green;
`
const ConfirmationWindowStyled = styled.div`
  margin: 0;
  background-color: yellow;
`
