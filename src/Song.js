import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import AudioPlayer from 'react-h5-audio-player'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'
import { UpArrow } from 'styled-icons/boxicons-regular/UpArrow'

Song.propTypes = {
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.string,
  tabs: PropTypes.string
}

Song.defaultProps = {
  title: '(No title)'
}

export default function Song({ key, title, lyrics, tabs, sound }) {
  const [isSongContentVisible, setIsSongContentVisible] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)

  function onClickToggleButton() {
    setIsButtonActive(!isButtonActive)
    setIsSongContentVisible(!isSongContentVisible)
  }
  return (
    <SongStyled>
      <h2>{title}</h2>
      <ToggleButtonStyled onClick={onClickToggleButton} active={isButtonActive}>
        {isButtonActive ? (
          <UpArrowStyled></UpArrowStyled>
        ) : (
          <DownArrowStyled></DownArrowStyled>
        )}
      </ToggleButtonStyled>
      {isSongContentVisible && (
        <section>
          <p>
            {lyrics.split('/&').map(line => (
              <li>{line}</li>
            ))}
          </p>
          <p>{tabs && tabs.split('/&').map(line => <li>{line}</li>)}</p>
          <AudioPlayer src={require('' + sound)} />
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
  position: relative;
`

const ToggleButtonStyled = styled.div`
  border: 2px solid black;
  right: 10px;
  top: 5px;
  position: absolute;
  background-color: ${props => (props.active ? 'darkgray' : 'lightgray')};
`

const DownArrowStyled = styled(DownArrow)`
  height: 50px;
  width: 50px;
  color: green;
`
const UpArrowStyled = styled(UpArrow)`
  height: 50px;
  width: 50px;
  color: green;
`
