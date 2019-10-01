import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import AudioPlayer from 'react-h5-audio-player'
// import exampleSong from './WhereEaglesDare.mp3'

Song.propTypes = {
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.string,
  tabs: PropTypes.string
}

Song.defaultProps = {
  title: '(No title)'
}

export default function Song({ key, title, lyrics, tabs }) {
  const [isSongContentVisible, setIsSongContentVisible] = useState(false)

  function toggleSongContent() {
    setIsSongContentVisible(!isSongContentVisible)
  }

  return (
    <SongStyled>
      <AudioPlayer
        src={require('./WhereEaglesDare.mp3')}
        onPlay={e => console.log('onPlay')}
        // other props here
      />
      <h2 onClick={toggleSongContent}>{title}</h2>
      {isSongContentVisible && (
        <section>
          <p>
            {lyrics.split('/&').map(line => (
              <li>{line}</li>
            ))}
          </p>
          <p>{tabs && tabs.split('/&').map(line => <li>{line}</li>)}</p>
        </section>
      )}
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
