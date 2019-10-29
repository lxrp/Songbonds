const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')

router.get('/', (req, res) => {
  const { query } = req
  const { token } = query

  UserSession.findById(token).then(session => {
    const userId = session.userId
    User.findById(userId)
      .then(activeUser => res.json(activeUser))
      .catch(err => res.json(err))
  })
})
module.exports = router
