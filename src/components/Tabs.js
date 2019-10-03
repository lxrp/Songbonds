import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Guitar } from 'styled-icons/fa-solid/Guitar'

Tabs.propTypes = {
  tab: PropTypes.string
}

export default function Tabs({ tab }) {
  const [areTabFilesVisible, setAreTabFilesVisible] = useState(false)
  const tabFormated = tab.split('%').map(line => <li>{line}</li>)

  function toggleTabFiles() {
    setAreTabFilesVisible(!areTabFilesVisible)
  }

  return (
    <article>
      <TabFileStyled onClick={toggleTabFiles}></TabFileStyled>
      {areTabFilesVisible && <p>{tabFormated}</p>}
    </article>
  )
}

const TabFileStyled = styled(Guitar)`
  height: 50px;
  width: 50px;
  color: green;
`
