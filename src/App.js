import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import { getSongs } from './services'
import Login from './components/Login'
import { getFromStorage } from './Storage'

export default function App() {
  const [songs, setSongs] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    updateSongs()
  }, [])

  function updateSongs() {
    getSongs().then(setSongs)
  }

  useEffect(() => {
    verify()
  }, [])

  function verify() {
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

  return (
    <Router>
      {isLoggedIn && (
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <Homepage updateSongs={updateSongs} songs={songs}></Homepage>
            </React.Fragment>
          )}
        />
      )}
      <Route
        exact
        path="/login"
        render={() => (
          <React.Fragment>
            <Login></Login>
          </React.Fragment>
        )}
      />
    </Router>
  )
}
