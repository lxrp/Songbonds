import React from 'react'
import Song from './Song'
import songdata from './songdata.json'

export default function App() {
  return (
    <div>
      {songdata.map(song => (
        <Song
          key={song._id}
          title={song.title}
          lyrics={song.lyrics}
          tabs={song.tabs}
          sounds={song.sounds}
        />
      ))}
    </div>
  )
}
