import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Cross } from 'styled-icons/icomoon/Cross'
import { deleteSong } from '../../services'

DeleteSong.propTypes = {
  id: PropTypes.string,
  updateSongs: PropTypes.func,
  setChosenEditForm: PropTypes.func,
  chosenEditForm: PropTypes.number
}
export default function DeleteSong({
  id,
  updateSongs,
  setChosenEditForm,
  chosenEditForm
}) {
  const [isConfirmationActive, setIsConfirmationActive] = useState(false)

  function toggleDeletion() {
    setIsConfirmationActive(!isConfirmationActive)
    setChosenEditForm(chosenEditForm === 0 ? (chosenEditForm = 2) : 0)
  }

  function deleteThisSong() {
    deleteSong(id).then(updateSongs)
  }

  return (
    chosenEditForm !== 1 &&
    (!isConfirmationActive ? (
      <DeleteSongStyled>
        <h3>delete Song</h3>
        <DeleteButtonStyled onClick={toggleDeletion}></DeleteButtonStyled>
      </DeleteSongStyled>
    ) : (
      <ConfirmationWindowStyled>
        <p>Do you really want to delete this complete Song?</p>
        <button onClick={deleteThisSong}>Yes</button>
        <button onClick={toggleDeletion}>No</button>
      </ConfirmationWindowStyled>
    ))
  )
}
const DeleteSongStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`

const DeleteButtonStyled = styled(Cross)`
  height: 30px;
  color: var(--greywhite);
  cursor: pointer;
`

const ConfirmationWindowStyled = styled.div`
  color: var(--darkblue);
  margin: 0;
  display: flex;
  align-items: center;
  align-content: center;
  border-radius: 10px;
  background-color: var(--orange);
  p {
    text-align: center;
    font-size: 1em;
    margin: 10px;
  }
  button {
    margin: 10px;
  }
`
