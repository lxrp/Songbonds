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
  isAddFileVisible
}) {
  const [isAddFileFormActive, setIsAddFileFormActive] = useState(false)

  function openFileForm() {
    setIsAddFileVisible(!isAddFileVisible)
    setIsAddFileFormActive(!isAddFileFormActive)
  }

  function submitFile(event) {
    setIsAddFileFormActive(!isAddFileFormActive)
    const chosenFileType = event.currentTarget.getAttribute('name')
    setFileType(chosenFileType)
    setIsFormActive(true)
  }

  return (
    <section>
      {isAddFileVisible && (
        <div>
          <h3>add File</h3>
          <AddFileStyled onClick={openFileForm}></AddFileStyled>
        </div>
      )}
      {isAddFileFormActive && (
        <div>
          <h2>Choose Filetype:</h2>
          <AddLyricStyled
            name="newLyrics"
            onClick={submitFile}
          ></AddLyricStyled>
          <AddTabStyled name="newTab" onClick={submitFile}></AddTabStyled>
          <AddSoundStyled name="newSound" onClick={submitFile}></AddSoundStyled>
          <button onClick={openFileForm}>Cancel</button>
        </div>
      )}
    </section>
  )
}

const AddFileStyled = styled(FilePlus)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddLyricStyled = styled(FileText)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddTabStyled = styled(Guitar)`
  height: 50px;
  width: 50px;
  color: green;
`
const AddSoundStyled = styled(FileAudio)`
  height: 50px;
  width: 50px;
  color: green;
`
