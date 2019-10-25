import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import 'whatwg-fetch'
import { onLogin } from '../../services'

Login.propTypes = {
  onLoginClick: PropTypes.func
}

export default function Login({ onLoginClick }) {
  const [activeUser, setActiveUser] = useState()

  // console.log('* active User:', activeUser)

  function handleLogin(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)

    const loginEmail = data.loginEmail
    const loginPassword = data.loginPassword

    onLogin(loginEmail, loginPassword, setActiveUser).then(onLoginClick)
  }

  return (
    <React.Fragment>
      <h2>Login</h2>
      <FormStyled onSubmit={handleLogin}>
        <label>
          Your email-adress:
          <input name="loginEmail" type="email" placeholder="email"></input>
        </label>
        <label>
          Type in your password:
          <input
            name="loginPassword"
            type="password"
            placeholder="password"
          ></input>
        </label>
        <button>log in</button>
      </FormStyled>
    </React.Fragment>
  )
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
