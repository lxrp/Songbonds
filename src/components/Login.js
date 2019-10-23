import React, { useState } from 'react'
import 'whatwg-fetch'
import { onLogin, onSignUp } from '../services'
import { getFromStorage, setInStorage, deleteFromStorage } from '../Storage'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [token, setToken] = useState('')

  function handleSignup(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)

    const signUpEmail = data.signUpEmail
    const signUpPassword = data.signUpPassword

    onSignUp(signUpEmail, signUpPassword)
  }

  function handleLogin(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = Object.fromEntries(formData)

    const loginEmail = data.loginEmail
    const loginPassword = data.loginPassword

    onLogin(loginEmail, loginPassword)
  }

  function logout() {
    const obj = getFromStorage('user')

    if (obj && obj.token) {
      const { token } = obj
      // Verify token
      fetch('/users/logout?token=' + token)
        .then(res => res.json())

        .then(json => {
          console.log(token)
          if (json.success) {
            deleteFromStorage('user')
            console.log('success')
          } else {
            console.log('json-Error', json, json.message)
          }
        })
    } else {
      console.log('Error')
    }
  }

  if (!token) {
    return (
      <div>
        <div>
          {/* {loginError ? <p>{loginError}</p> : null} */}
          <React.Fragment>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input name="loginEmail" type="email"></input>
              <input name="loginPassword" type="password"></input>
              <button>Log In</button>
            </form>
          </React.Fragment>
        </div>
        <div>
          <p>Logout</p>
          <button onClick={logout}>Logout</button>
        </div>

        <div>
          {/* {signUpError ? <p>{signUpError}</p> : null} */}
          <React.Fragment>
            <h2>SignUp</h2>
            <form onSubmit={handleSignup}>
              <input name="signUpEmail" type="email"></input>
              <input name="signUpPassword" type="password"></input>
              <button>SignUp</button>
            </form>
          </React.Fragment>
        </div>
      </div>
    )
  }
}
