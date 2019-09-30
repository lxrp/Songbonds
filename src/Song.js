import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import songdata from './songdata.json'

Song.propTypes = {
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.string,
  tabs: PropTypes.string
}

Song.defaultProps = {
  title: '(No title)'
}

export default function Song() {
  return (
    <div>
      {songdata.map(song => (
        <SongStyled key="index">
          <h2>{song.title}</h2>
          <p>
            {song.lyrics.split('/&').map(line => (
              <li>{line}</li>
            ))}
          </p>
          <p>
            {song.tabs && song.tabs.split('/&').map(line => <li>{line}</li>)}
          </p>
        </SongStyled>
      ))}
    </div>
  )
}

const SongStyled = styled.article`
  border: 2px solid;
  background-color: darkgray;
  margin: 10px;
`
