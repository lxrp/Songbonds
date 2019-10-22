import React from 'react'

export default function GetTimestamp({ lyrics, tab, sound }) {
  let fileType

  if (lyrics != null) {
    fileType = lyrics
  } else if (tab != null) {
    fileType = tab
  } else if (sound != null) {
    fileType = sound
  }

  const timestamp = new Date(fileType.timestamp)
  const minute = timestamp.getMinutes()
  const hour = timestamp.getHours()
  const day = timestamp.getDate()
  const monthIndex = timestamp.getMonth()
  const year = timestamp.getFullYear()

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return (
    <p>
      Created on {day} {month[monthIndex + 1]} {year}; {hour}:{minute}
    </p>
  )
}
