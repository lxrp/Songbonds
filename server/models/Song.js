const mongoose = require('mongoose')

const Song = mongoose.model('Song', {
  title: String,
  lyrics: Array,
  tabs: Array,
  sounds: Array
})

module.exports = Song
