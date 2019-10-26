import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import SB_Name from '../../images/SB_Name.png'
import { getSongsByAuthor } from '../../services'
import Logout from '../login/Logout'
import CreateSong from './CreateSong'
import Song from './Song'

HomePage.propTypes = {
  activeUser: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func
}

export default function HomePage({ activeUser, isLoggedIn, onLogout }) {
  const [songs, setSongs] = useState([])
  let history = useHistory()

  isLoggedIn !== null && !isLoggedIn && history.push('/')

  useEffect(() => {
    getSongsByAuthor(activeUser._id).then(res => {
      setSongs(res)
    })
  }, [activeUser])

  function updateSongs() {
    getSongsByAuthor(activeUser._id).then(res => {
      setSongs(res)
    })
  }

  return (
    <React.Fragment>
      <NavBarStyled>
        <button onClick={updateSongs}>UPDATE!!!</button>
        <ImageStyled src={SB_Name} alt="Songbonds" />
        <div>Hello {activeUser.name}</div>

        <CreateSong activeUser={activeUser} updateSongs={updateSongs} />
        <Logout onLogout={onLogout}></Logout>
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
