const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
  {
    author: String,
    title: String,
    lyrics: Array,
    tabs: Array,
    sounds: Array
  },
  { toJSON: { virtuals: true } }
)

module.exports = mongoose.model('Song', songSchema)
