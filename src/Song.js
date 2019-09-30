import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Song.propTypes = {
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.string,
  tabs: PropTypes.string
}

Song.defaultProps = {
  title: '(No title)'
}

export default function Song({ key, title, lyrics, tabs }) {
  return (
    <SongStyled>
      <h2>{title}</h2>
      <p>
        {lyrics.split('/&').map(line => (
          <li>{line}</li>
        ))}
      </p>
      <p>{tabs && tabs.split('/&').map(line => <li>{line}</li>)}</p>
    </SongStyled>
  )
}

const SongStyled = styled.article`
  border: 2px solid;
  background-color: darkgray;
  margin: 10px;
  padding: 10px;
  list-style: none;
`
