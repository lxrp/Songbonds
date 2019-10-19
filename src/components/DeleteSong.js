import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Cross } from 'styled-icons/icomoon/Cross'
import { deleteSong } from '../services'

export default function DeleteSong({ id, updateSongs }) {
  const [isConfirmationActive, setIsConfirmationActive] = useState(false)

  function toggleDeletion() {
    setIsConfirmationActive(!isConfirmationActive)
  }

  function deleteThisSong() {
    deleteSong(id).then(updateSongs)
  }

  return !isConfirmationActive ? (
    <React.Fragment>
      <h3>delete Song</h3>
      <DeleteSongStyled onClick={toggleDeletion}></DeleteSongStyled>
    </React.Fragment>
  ) : (
    <ConfirmationWindowStyled>
      <h3>Do you really want to delete this complete Song?</h3>
      <button onClick={deleteThisSong}>Yes</button>
      <button onClick={toggleDeletion}>No</button>
    </ConfirmationWindowStyled>
  )
}

const DeleteSongStyled = styled(Cross)`
  height: 50px;
  width: 50px;
  color: green;
`
const ConfirmationWindowStyled = styled.div`
  margin: 0;
  background-color: yellow;
`
