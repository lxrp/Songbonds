import React from 'react'
import Sounds from './Sounds'

export default {
  title: 'Sounds',
  decorators: [Wrapper]
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '300px', background: '#eee', padding: '20px' }}>
      {storyFn()}
    </div>
  )
}

export const sounds = () => <Sounds sound="./songfiles/TheCrowd.mp3" />
