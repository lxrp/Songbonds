import React from 'react'
import ToggleButton from './ToggleButton'

export default {
  title: 'ToggleButton',
  decorators: [Wrapper]
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '300px', background: '#eee', padding: '20px' }}>
      {storyFn()}
    </div>
  )
}

export const toggleButton = () => <ToggleButton />
