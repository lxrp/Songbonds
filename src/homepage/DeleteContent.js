import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { DeleteForever } from 'styled-icons/material/DeleteForever'
import { patchSong } from '../services'

DeleteContent.propTypes = {
  id: PropTypes.string,
  content: PropTypes.object,
  updateSongs: PropTypes.func,
  resetEditMode: PropTypes.func,
  contentToDelete: PropTypes.object,
  type: PropTypes.string
}

export default function DeleteContent({
  id,
  content,
  updateSongs,
  resetEditMode,
  contentToDelete,
  type
}) {
  const [isConfirmationActive, setIsConfirmationActive] = useState(false)

  function toggleDeletion() {
    setIsConfirmationActive(!isConfirmationActive)
  }

  function deleteFile() {
    let fileToPatch
    const indexToDelete = content[type].findIndex(
      element => element === contentToDelete
    )
    const newData = [
      ...content[type].slice(0, indexToDelete),
      ...content[type].slice(indexToDelete + 1)
    ]
    fileToPatch = { [type]: newData }

    patchSong(id, fileToPatch).then(updateSongs)
    toggleDeletion()
    resetEditMode()
  }

  return !isConfirmationActive ? (
    <DeleteButtonStyled onClick={toggleDeletion}></DeleteButtonStyled>
  ) : (
    <ConfirmationWindowStyled>
      <p>Do you really want to delete this file?</p>
      <button onClick={toggleDeletion}>No</button>
      <button onClick={deleteFile}>Yes</button>
    </ConfirmationWindowStyled>
  )
}

const DeleteButtonStyled = styled(DeleteForever)`
  height: 40px;
  color: var(--orange);
  cursor: pointer;
`

const ConfirmationWindowStyled = styled.div`
  font-size: 1.5em;
  margin: 5px;
  display: flex;
  align-items: center;
  align-content: center;

  border-radius: 10px;
  background-color: var(--orange);
  p {
    text-align: center;
    font-size: 1em;
    margin: 10px;
    grid-column: 1/3;
  }
  button {
    margin: 10px;
  }
`
