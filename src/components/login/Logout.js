import React from 'react'
import 'whatwg-fetch'
import { deleteFromStorage, getFromStorage } from '../../Storage'
import styled from 'styled-components/macro'
import { LogOutCircle } from 'styled-icons/boxicons-regular/LogOutCircle'
import PropTypes from 'prop-types'

Logout.propTypes = {
  onLogout: PropTypes.func
}

export default function Logout({ onLogout }) {
  function logout() {
    const tokenObject = getFromStorage('user')

    if (tokenObject && tokenObject.token) {
      const { token } = tokenObject
      // Verify token
      fetch('users/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            deleteFromStorage('user')
          } else {
            console.log('json-Error', json, json.message)
          }
        })
        .then(onLogout)
    } else {
      console.log('Error')
    }
  }

  return (
    <React.Fragment>
      <LogOutCircleStyled onClick={logout}></LogOutCircleStyled>
    </React.Fragment>
  )
}

const LogOutCircleStyled = styled(LogOutCircle)`
  width: 40px;
  height: 40px;
  color: var(--greywhite);
  border-radius: 10px;
  background-color: var(--darkblue);
  cursor: pointer;
`
