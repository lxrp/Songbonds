import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { FilePlus } from 'styled-icons/boxicons-solid/FilePlus'
import { FileAudio } from 'styled-icons/fa-solid/FileAudio'
import { Guitar } from 'styled-icons/fa-solid/Guitar'
import { FileText } from 'styled-icons/icomoon/FileText'

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
        <div>
          <h3>add File</h3>
          <AddButtonStyled onClick={openFileForm}></AddButtonStyled>
        </div>
      )}
      {isAddFileFormActive && (
        <React.Fragment>
          <StyledH3>Choose Filetype:</StyledH3>
          <ChooseFilesStyled>
            <AddLyricStyled
              name="newLyrics"
              onClick={submitFile}
            ></AddLyricStyled>
            <AddTabStyled name="newTab" onClick={submitFile}></AddTabStyled>
            <AddSoundStyled
              name="newSound"
              onClick={submitFile}
            ></AddSoundStyled>
          </ChooseFilesStyled>
          <button onClick={openFileForm}>Cancel</button>
        </React.Fragment>
      )}
    </AddFileStyled>
  )
}

const StyledH3 = styled.h3`
  color: var(--orange);
`
const ChooseFilesStyled = styled.div`
  display: flex;
  gap: 10px;
`

const AddFileStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-content: center;

  button {
    margin-top: 20px;
    height: 30px;
    color: var(--darkblue);
    background-color: var(--greywhite);
    cursor: pointer;
  }
`

const AddButtonStyled = styled(FilePlus)`
  height: 40px;
  color: var(--greywhite);
  cursor: pointer;
`
const AddLyricStyled = styled(FileText)`
  height: 50px;
  color: var(--greywhite);
  cursor: pointer;
`
const AddTabStyled = styled(Guitar)`
  height: 50px;
  color: var(--greywhite);
  cursor: pointer;
`
const AddSoundStyled = styled(FileAudio)`
  height: 50px;
  color: var(--greywhite);
  cursor: pointer;
`
