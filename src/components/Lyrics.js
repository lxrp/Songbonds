import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { FileText } from 'styled-icons/icomoon/FileText'

Lyrics.propTypes = {
  text: PropTypes.string
}

export default function Lyrics({ text }) {
  const [areTextFilesVisible, setAreTextFilesVisible] = useState(false)
  const textFormated = text.split('%').map(line => <li>{line}</li>)

  function toggleTextFiles() {
    setAreTextFilesVisible(!areTextFilesVisible)
  }

  return (
    <article>
      <TextFileStyled onClick={toggleTextFiles}></TextFileStyled>
      {areTextFilesVisible && <p>{textFormated}</p>}
    </article>
  )
}

const TextFileStyled = styled(FileText)`
  height: 50px;
  width: 50px;
  color: green;
`
