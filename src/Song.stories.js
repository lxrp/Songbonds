import React from 'react'
import Song from './Song'

export default {
  title: 'Song',
  decorators: [Wrapper]
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '300px', background: '#eee', padding: '20px' }}>
      {storyFn()}
    </div>
  )
}

export const song = () => (
  <Song
    title="Songtitle"
    lyrics="This are the lyrics of the song"
    tabs="e| ------------------------|/&B|------------------------|/&G| ------------------------|/&D|-7-7-7-7-7-7-7-7-7-7--5-|/&A| -7 - 7 - 7 - 7 - 7 - 7 - 7 - 7 - 7 - 7--5 -|/&E|-5-5-5-5-5-5-5-5-5-5--3-|"
  />
)
