import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/homepage/Homepage'
import LandingPage from './components/login/LandingPage'
import { getSongs } from './services'
import { getFromStorage } from './Storage'

export default function App() {
  const [songs, setSongs] = useState([])

  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    verifyUser()
  }, [])

  function verifyUser() {
    const obj = getFromStorage('user')
    if (obj && obj.token) {
      const { token } = obj
      // Verify token
      return fetch('/verify?token=' + token)
        .then(res => res.json())
        .then(setIsLoggedIn(true))
    } else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    updateSongs()
  }, [])

  function updateSongs() {
    getSongs().then(setSongs)
  }

  return (
    <Router>
      <Route
        exact
        path="/home"
        render={() => (
          <React.Fragment>
            <Homepage
              isLoggedIn={isLoggedIn}
              updateSongs={updateSongs}
              songs={songs}
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
              isLoggedIn={isLoggedIn}
              onLogin={verifyUser}
            ></LandingPage>
          </React.Fragment>
        )}
      />
    </Router>
  )
}
