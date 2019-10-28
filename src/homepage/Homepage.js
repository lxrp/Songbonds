import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import SB_Name from '../images/SB_Logo.png'
import { getSongsByAuthor } from '../services'
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
        <ImageStyled src={SB_Name} alt="Songbonds" />
        <UserBoxStyled>Hello {activeUser.name}!</UserBoxStyled>

        <Logout onLogout={onLogout}></Logout>
      </NavBarStyled>

      <HomePageStyled>
        <CreateSong activeUser={activeUser} updateSongs={updateSongs} />
        <SongSectionStyled>
          {songs.reverse().map(song => (
            <Song
              key={song._id}
              id={song._id}
              content={song}
              updateSongs={updateSongs}
            />
          ))}
        </SongSectionStyled>
      </HomePageStyled>
    </React.Fragment>
  )
}

const NavBarStyled = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`
const ImageStyled = styled.img`
  height: 100%;
  width: auto;
  max-width: 100px;
`

const UserBoxStyled = styled.div`
  position: relative;
  background: var(--darkblue);
  border-radius: 10px;
  color: var(--greywhite);
  height: 100%;
  width: auto;
  min-width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;

  :after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 24px solid transparent;
    border-right-color: var(--darkblue);
    border-left: 0;
    border-bottom: 0;
    margin-top: -12px;
    margin-left: -24px;
  }
`

const HomePageStyled = styled.main`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SongSectionStyled = styled.section`
  width: 100%;
`
