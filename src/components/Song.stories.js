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
    lyrics="[Songtext]"
    tabs="[Guitar- and bass tabs]"
    sounds="[./songfiles.TheCrowd.mp3]"
  />
)
