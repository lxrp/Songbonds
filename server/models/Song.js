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

songSchema.virtual('timestamp-song').get(function() {
  return this._id.getTimestamp()
})
const Song = mongoose.model('Song', songSchema)

module.exports = Song
