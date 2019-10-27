import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/macro'
import 'whatwg-fetch'
import { onLogin, onSignUp } from '../services'

SignUp.propTypes = {
  onSignUpClick: PropTypes.func,
  toggleSignUp: PropTypes.func
}

export default function SignUp({ onSignUpClick, toggleSignUp }) {
  function handleSignup(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    const { signUpEmail, signUpPassword, username } = data

    onSignUp(username, signUpEmail, signUpPassword).then(autoLogin)

    function autoLogin() {
      onLogin(signUpEmail, signUpPassword).then(updatePage)
    }
  }

  function updatePage() {
    onSignUpClick(true)
  }

  return (
    <React.Fragment>
      <h2>SignUp</h2>
      <FormStyled onSubmit={handleSignup}>
        <label>
          How do you want to be called in Songbonds?
          <input
            autoFocus
            name="username"
            type="text"
            placeholder="username"
          ></input>
        </label>
        <label>
          Email-adress for your account:
          <input
            name="signUpEmail"
            type="email"
            placeholder="your email-adress"
          ></input>
        </label>
        <label>
          Type in your password:
          <input
            name="signUpPassword"
            type="password"
            placeholder="your password"
          ></input>
        </label>
        <button>create account</button>
        <CancelButtonStyled onClick={toggleSignUp}>cancel</CancelButtonStyled>
      </FormStyled>
    </React.Fragment>
  )
}

const CancelButtonStyled = styled.button`
  margin-top: 20px;
`

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
