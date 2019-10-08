import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CreateSong from './components/CreateSong'
import Homepage from './components/Homepage'
import { getSongs } from './services'

export default function App() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    getSongs().then(setSongs)
  }, [songs])

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() => (
          <reactFragment>
            <Homepage songs={songs}></Homepage>
            <CreateSong />
          </reactFragment>
        )}
      />
    </Router>
  )
}
