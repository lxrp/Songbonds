import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import SB_Name from '../../images/SB_Name.png'
import Logout from '../login/Logout'
import CreateSong from './CreateSong'
import Song from './Song'

HomePage.propTypes = {
  songs: PropTypes.array,
  updateSongs: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
}

export default function HomePage({ isLoggedIn, songs, updateSongs, onLogout }) {
  let history = useHistory()

  isLoggedIn !== null && !isLoggedIn && history.push('/')

  return (
    <React.Fragment>
      <NavBarStyled>
        <ImageStyled src={SB_Name} alt="Songbonds" />
        <Logout updateSongs={updateSongs} onLogout={onLogout}></Logout>
      </NavBarStyled>
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

const NavBarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px 0 20px;
`

const HomePageStyled = styled.main`
  padding: 5px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: stretch;
`

const ImageStyled = styled.img`
  width: 50%;
  max-width: 300px;
`
