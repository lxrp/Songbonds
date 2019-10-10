import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Guitar } from 'styled-icons/fa-solid/Guitar'

Tabs.propTypes = {
  tab: PropTypes.object
}

export default function Tabs({ tab }) {
  const [areTabFilesVisible, setAreTabFilesVisible] = useState(false)
  const tabFormated = tab.content
    .split('%')
    .map((line, index) => <li key={index}>{line}</li>)

  function toggleTabFiles() {
    setAreTabFilesVisible(!areTabFilesVisible)
  }

  return (
    <section>
      <TabFileStyled onClick={toggleTabFiles}></TabFileStyled>
      {areTabFilesVisible && (
        <React.Fragment>
          <h4>{tab.subtitle}</h4>
          <p>{tabFormated}</p>
        </React.Fragment>
      )}
    </section>
  )
}

const TabFileStyled = styled(Guitar)`
  height: 50px;
  width: 50px;
  color: green;
`
