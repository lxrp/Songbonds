import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { UpArrow } from 'styled-icons/boxicons-regular/UpArrow'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'
import Lyrics from './Lyrics'
import Sounds from './Sounds'
import Tabs from './Tabs'
import AddFile from './AddFile'

Song.propTypes = {
  title: PropTypes.string.isRequired,
  lyrics: PropTypes.arrayOf(PropTypes.string),
  tabs: PropTypes.arrayOf(PropTypes.string),
  sound: PropTypes.arrayOf(PropTypes.string)
}

Song.defaultProps = {
  title: '(No title)'
}

export default function Song({ title, lyrics, tabs, sounds }) {
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
          {lyrics.map(text => (
            <Lyrics text={text}> </Lyrics>
          ))}

          {tabs.map(tab => (
            <Tabs tab={tab}></Tabs>
          ))}

          {sounds.map(sounds => (
            <Sounds sound={sounds}></Sounds>
          ))}
          <AddFile></AddFile>
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
  background-color: ${item => (item.active ? 'darkgray' : 'lightgray')};
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
