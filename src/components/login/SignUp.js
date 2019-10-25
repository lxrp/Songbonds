import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components/macro'
import 'whatwg-fetch'
import { onLogin, onSignUp } from '../../services'

SignUp.propTypes = {
  onSignUpClick: PropTypes.func,
  toggleSignUp: PropTypes.func
}

export default function SignUp({ onSignUpClick, toggleSignUp }) {
  const [isBand, setIsBand] = useState(false)

  function handleSignup(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)

    const { signUpEmail, signUpPassword, username, bandname } = data

    onSignUp(username, signUpEmail, signUpPassword, isBand, bandname)
      .then(autoLogin)
      .then(onSignUpClick)

    function autoLogin() {
      onLogin(signUpEmail, signUpPassword)
    }
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
        Do you have a band and want to share your songs with the members?
        <BandToggleButtonStyled onClick={() => setIsBand(!isBand)}>
          Yes!
        </BandToggleButtonStyled>
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

const BandToggleButtonStyled = styled.div`
  width: 50px;
  height: 50px;
  background-color: hotpink;
  cursor: pointer;
`

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
