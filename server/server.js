const express = require('express')
const cors = require('cors')
const server = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Songbonds', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

server.listen(3333, () => console.log('Server ready on port 3333'))
server.use(express.json())
server.use(cors())
server.set('json spaces', 2)

server.use('/getSongsByAuthor', require('./routes/getSongsByAuthor'))
server.use('/getUser', require('./routes/getUser'))
server.use('/login', require('./routes/login'))
server.use('/logout', require('./routes/logout'))
server.use('/signup', require('./routes/signup'))
server.use('/songs', require('./routes/songs'))

// Bodyparser middleware
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
