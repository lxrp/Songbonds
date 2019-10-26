const router = require('express').Router()
const Song = require('../models/Song')

router.get('/', (req, res) => {
  const { query } = req
  const { author } = query

  Song.find({
    author: author
  })
    .then(songs => res.json(songs))
    .catch(err => res.json(err))
})

module.exports = router
