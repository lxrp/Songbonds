import React, { useState, useEffect } from 'react'
import Song from './components/Song'
import { getSongs } from './services'
import CreateSong from './components/CreateSong'

export default function App() {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    getSongs().then(setSongs)
  }, [])

  return (
    <reactFragment>
      <div>
        {songs.map(song => (
          <Song
            key={song._id}
            title={song.title}
            lyrics={song.lyrics}
            tabs={song.tabs}
            sounds={song.sounds}
          />
        ))}
      </div>
      <CreateSong></CreateSong>
    </reactFragment>
  )
}
