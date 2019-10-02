import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { FileText2 } from 'styled-icons/icomoon/FileText2'

export default function Lyrics({ lyrics }) {
  const [areTextFilesVisible, setAreTextFilesVisible] = useState(false)

  function toggleTextFiles() {
    setAreTextFilesVisible(!areTextFilesVisible)
  }

  return (
    <p>
      {lyrics.map(text => (
        <p>
          <TextFileStyled onClick={toggleTextFiles}></TextFileStyled>
          {areTextFilesVisible && <p>{text}</p>}
        </p>
      ))}
    </p>
  )
}

const TextFileStyled = styled(FileText2)`
  height: 50px;
  width: 50px;
  color: green;
`
