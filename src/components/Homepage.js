import React from 'react'
import Song from './Song'
import styled from 'styled-components/macro'

export default function HomePage({ songs }) {
  return (
    <HomePageStyled>
      <h1>Songbonds</h1>
      {songs.map(song => (
        <Song
          key={song._id}
          title={song.title}
          lyrics={song.lyrics}
          tabs={song.tabs}
          sounds={song.sounds}
        />
      ))}
    </HomePageStyled>
  )
}

const HomePageStyled = styled.main`
  padding: 5px;
  align-content: flex-start;
  gap: 1px;
`
