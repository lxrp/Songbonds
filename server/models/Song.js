const mongoose = require('mongoose')

const Song = mongoose.model('Song', {
  title: String,
  lyrics: String,
  tabs: String,
  sounds: String
})

module.exports = Song
