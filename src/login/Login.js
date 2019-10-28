import PropTypes from 'prop-types'
import React from 'react'
import { onLogin } from '../services'

Login.propTypes = {
  onLoginClick: PropTypes.func,
  setActiveUser: PropTypes.func
}

export default function Login({ onLoginClick, setActiveUser }) {
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
      <form onSubmit={handleLogin}>
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
      </form>
    </React.Fragment>
  )
}
