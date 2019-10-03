import React from 'react'
import Lyrics from './Lyrics'

export default {
  title: 'Lyrics',
  decorators: [Wrapper]
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '300px', background: '#eee', padding: '20px' }}>
      {storyFn()}
    </div>
  )
}

export const lyrics = () => <Lyrics text="songtext" />
