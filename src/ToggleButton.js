import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { DownArrow } from 'styled-icons/boxicons-solid/DownArrow'

export default function ToggleButton({ onClick }) {
  const [buttonNotActive, setButtonNotActive] = useState(false)

  function toggleButtonValue() {
    setButtonNotActive(!buttonNotActive)
  }

  return (
    <ToggleButtonStyled onClick={toggleButtonValue}>
      <ArrowStyled></ArrowStyled>
    </ToggleButtonStyled>
  )
}

const ToggleButtonStyled = styled.div`
  border: 2px solid black;
  right: 10px;
  top: 5px;
  position: absolute;
`

const ArrowStyled = styled(DownArrow)`
  height: 50px;
  width: 50px;
  color: ${props => (props.active ? 'hotpink' : 'blue')};
`
