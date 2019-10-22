import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'
import SB_Name from '../images/SB_Name.png'
import CreateSong from './CreateSong'
import Song from './Song'

HomePage.propTypes = {
  songs: PropTypes.array,
  updateSongs: PropTypes.func
}

export default function HomePage({ songs, updateSongs }) {
  return (
    <React.Fragment>
      <ImageStyled src={SB_Name} alt="Songbonds" />
      <HomePageStyled>
        {songs.map(song => (
          <Song
            key={song._id}
            id={song._id}
            content={song}
            updateSongs={updateSongs}
          />
        ))}
        <NavBarStyled>
          <CreateSong updateSongs={updateSongs} />
        </NavBarStyled>
      </HomePageStyled>
    </React.Fragment>
  )
}

const HomePageStyled = styled.main`
  padding: 5px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: stretch;
`
const NavBarStyled = styled.nav`
  display: flex;
  justify-content: center;
`

const ImageStyled = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  max-width: 300px;
`
