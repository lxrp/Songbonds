import React from 'react'
import PropTypes from 'prop-types'

Timestamp.propTypes = {
  fileType: PropTypes.object
}

export default function Timestamp({ fileType }) {
  const timestamp = new Date(fileType.timestamp)

  const timestampFormated = timestamp.toLocaleDateString('en-EN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return <p>Created on {timestampFormated}</p>
}
