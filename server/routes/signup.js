const router = require('express').Router()
const User = require('../models/User')

router.post('/', (req, res) => {
  const { body } = req
  const { name } = body
  const { password } = body
  let { email } = body

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    })
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    })
  }

  email = email.toLowerCase()
  email = email.trim()

  User.find(
    {
      email: email
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        })
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        })
      }

      const newUser = new User()
      newUser.name = name
      newUser.email = email
      newUser.password = newUser.generateHash(password)

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error 2'
          })
        } else if (user)
          return res.send({
            success: true,
            message: 'Signed up'
          })
      })
    }
  )
})

module.exports = router
