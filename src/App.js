import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './homepage/Homepage'
import LandingPage from './login/LandingPage'
import { getActiveUser } from './services'
import { getFromStorage } from './Storage'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [activeUser, setActiveUser] = useState({})

  useEffect(() => {
    verifyUser()
  }, [isLoggedIn])

  function verifyUser() {
    const tokenObject = getFromStorage('user')
    if (tokenObject && tokenObject.token) {
      const { token } = tokenObject

      getActiveUser(token).then(user => {
        setActiveUser(user)
      })
      return fetch('/verify?token=' + token)
        .then(res => res.json())
        .then(setIsLoggedIn(true))
    } else {
      setIsLoggedIn(false)
    }
  }

  return (
    <Router>
      <Route
        exact
        path="/home"
        render={() => (
          <React.Fragment>
            <Homepage
              activeUser={activeUser}
              isLoggedIn={isLoggedIn}
              onLogout={verifyUser}
            ></Homepage>
          </React.Fragment>
        )}
      />

      <Route
        exact
        path="/"
        render={() => (
          <React.Fragment>
            <LandingPage
              onLogin={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            ></LandingPage>
          </React.Fragment>
        )}
      />
    </Router>
  )
}
