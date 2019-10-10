import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { FileText } from 'styled-icons/icomoon/FileText'

Lyrics.propTypes = {
  text: PropTypes.object
}

export default function Lyrics({ text }) {
  const [areTextFilesVisible, setAreTextFilesVisible] = useState(false)

  const textFormated = text.content
    .split('%')
    .map((line, index) => <li key={index}>{line}</li>)

  function toggleTextFiles() {
    setAreTextFilesVisible(!areTextFilesVisible)
  }

  return (
    <section>
      <TextFileStyled onClick={toggleTextFiles}></TextFileStyled>
      {areTextFilesVisible && (
        <React.Fragment>
          <h4>{text.subtitle}</h4>
          <p>{textFormated}</p>
        </React.Fragment>
      )}
    </section>
  )
}

const TextFileStyled = styled(FileText)`
  height: 50px;
  width: 50px;
  color: green;
`
