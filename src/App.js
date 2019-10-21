import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import { getSongs } from './services'

export default function App() {
  const [songs, setSongs] = useState([])

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
        path="/"
        render={() => (
          <React.Fragment>
            <Homepage updateSongs={updateSongs} songs={songs}></Homepage>
          </React.Fragment>
        )}
      />
    </Router>
  )
}
