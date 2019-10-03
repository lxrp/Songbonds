import React from 'react'
import Tabs from './Tabs'

export default {
  title: 'Tabs',
  decorators: [Wrapper]
}

function Wrapper(storyFn) {
  return (
    <div style={{ width: '300px', background: '#eee', padding: '20px' }}>
      {storyFn()}
    </div>
  )
}

export const tabs = () => <Tabs tab="|---3---|" />
