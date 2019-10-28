import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilePlus } from 'styled-icons/boxicons-solid/FilePlus'
import { FileAlt } from 'styled-icons/fa-solid/FileAlt'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'

ChooseFileTypeForm.propTypes = {
  setFileType: PropTypes.func,
  setIsFormActive: PropTypes.func,
  setIsAddFileVisible: PropTypes.func,
  isAddFileVisible: PropTypes.bool,
  setChosenEditForm: PropTypes.func,
  chosenEditForm: PropTypes.number
}

export default function ChooseFileTypeForm({
  setFileType,
  setIsFormActive,
  setIsAddFileVisible,
  isAddFileVisible,
  setChosenEditForm,
  chosenEditForm
}) {
  const [isAddFileFormActive, setIsAddFileFormActive] = useState(false)

  function openFileForm() {
    setIsAddFileVisible(!isAddFileVisible)
    setIsAddFileFormActive(!isAddFileFormActive)
    setChosenEditForm(chosenEditForm === 0 ? (chosenEditForm = 1) : 0)
  }

  function submitFile(event) {
    setIsAddFileFormActive(!isAddFileFormActive)
    const chosenFileType = event.currentTarget.getAttribute('name')
    setFileType(chosenFileType)
    setIsFormActive(true)
  }

  return (
    <AddFileStyled>
      {isAddFileVisible && (
        <React.Fragment>
          <h3>add file</h3>
          <AddButtonStyled onClick={openFileForm}></AddButtonStyled>
        </React.Fragment>
      )}
      {isAddFileFormActive && (
        <React.Fragment>
          <H3Styled>Choose filetype:</H3Styled>
          <div>
            <AddLyricStyled name="lyrics" onClick={submitFile}></AddLyricStyled>
            <AddTabStyled name="tab" onClick={submitFile}></AddTabStyled>
            <AddSoundStyled name="sound" onClick={submitFile}></AddSoundStyled>
          </div>
          <button onClick={openFileForm}>cancel</button>
        </React.Fragment>
      )}
    </AddFileStyled>
  )
}

const H3Styled = styled.h3`
  color: var(--orange);
`

const AddFileStyled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  button {
    margin: 20px 0 10px 0;
    width: 100%;
    max-width: 200px;
  }
`

const AddButtonStyled = styled(FilePlus)`
  width: 40px;
  color: var(--greywhite);
  cursor: pointer;
`
const AddLyricStyled = styled(FileAlt)`
  width: 40px;
  margin: 10px;
  color: var(--greywhite);
  cursor: pointer;
`
const AddTabStyled = styled(Guitar)`
  width: 40px;
  margin: 10px;
  color: var(--greywhite);
  cursor: pointer;
`
const AddSoundStyled = styled(FileAudio)`
  width: 40px;
  margin: 10px;
  color: var(--greywhite);
  cursor: pointer;
`
