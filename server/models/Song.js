const mongoose = require('mongoose')

const songSchema = mongoose.Schema(
  {
    title: String,
    lyrics: Array,
    tabs: Array,
    sounds: Array
  },
  { toJSON: { virtuals: true } }
)

songSchema.virtual('timestamp_song').get(function() {
  return this._id.getTimestamp()
})

module.exports = mongoose.model('Song', songSchema)
