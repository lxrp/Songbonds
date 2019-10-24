import React, { useState } from 'react'
import styled from 'styled-components/macro'
import 'whatwg-fetch'
import { onSignUp } from '../../services'
import PropTypes from 'prop-types'
import { onLogin } from '../../services'
import { useHistory } from 'react-router-dom'

SignUp.propTypes = {
  onSignUpClick: PropTypes.func,
  toggleSignUp: PropTypes.func
}

export default function SignUp({ onSignUpClick, toggleSignUp }) {
  let history = useHistory()
  const [isBand, setIsBand] = useState(false)

  function handleSignup(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)

    const signUpEmail = data.signUpEmail
    const signUpPassword = data.signUpPassword
    const username = data.username
    const bandname = data.bandname

    onSignUp(username, signUpEmail, signUpPassword, isBand, bandname)
      .then(autoLogin)
      .then(onSignUpClick)
      .then(toggleSignUp)

    function autoLogin() {
      onLogin(signUpEmail, signUpPassword)
    }
  }

  return (
    <React.Fragment>
      <h2>SignUp</h2>
      <FormStyled onSubmit={handleSignup}>
        <label>
          How do you wanna be called in Songbonds?
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
        <label>
          Do you have a band and want to share your songs with the members?
          <input
            value="I have a band"
            type="checkbox"
            onChange={() => setIsBand(!isBand)}
          ></input>
        </label>
        {isBand && (
          <label>
            What's the name of your band?
            <input name="bandname" type="text" placeholder="bandname"></input>
          </label>
        )}
        <button>create account</button>
      </FormStyled>
      <button onClick={toggleSignUp}>cancel</button>
    </React.Fragment>
  )
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
