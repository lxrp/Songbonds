import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { UpArrow } from 'styled-icons/boxicons-regular/UpArrow'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'
import Lyrics from './Lyrics'
import Sounds from './Sounds'
import Tabs from './Tabs'
import AddFile from './AddFile'

export default function Song({ id, title, lyrics, tabs, sounds }) {
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
          {lyrics.map((text, index) => (
            <Lyrics text={text} key={index}></Lyrics>
          ))}

          {tabs.map((tab, index) => (
            <Tabs tab={tab} key={index}></Tabs>
          ))}
          {sounds.map((sounds, index) => (
            <Sounds sound={sounds} key={index}></Sounds>
          ))}
          <AddFile
            id={id}
            lyrics={lyrics}
            tabs={tabs}
            sounds={sounds}
          ></AddFile>
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
