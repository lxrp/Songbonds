const router = require('express').Router()
const UserSession = require('../models/UserSession')

router.get('/', (req, res) => {
  const { query } = req
  const { token } = query

  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false
    },
    {
      $set: {
        isDeleted: true
      }
    },
    null,

    (err, sessions) => {
      if (err) {
        console.log(err)
        return res.send({
          success: false,
          message: 'Error: Server error'
        })
      }
      return res.send({
        success: true,
        message: 'Good'
      })
    }
  )
})

module.exports = router
