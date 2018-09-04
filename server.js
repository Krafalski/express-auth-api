// Dependencies
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const uuidv1 = require('uuid/v1')
const app = express()
const db = mongoose.connection
const MongoDBStore = require('connect-mongodb-session')(session)

// Configuration Environment Variables
require('dotenv').config()
const PORT = process.env.PORT
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/express_auth'

// Database

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
  () => console.log('MongoDB connection established:', mongoURI)
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// sessions storage
const store = new MongoDBStore({
  uri: mongoURI,
  collection: 'sessions'
})

store.on('connected', function () {
  store.client
})

store.on('error', function (error) {
  if (error) {
    console.log(error)
  }
})

// Middleware

// parse incoming body
// allow Cross-Access-Origin
app.use(cors())
app.use(express.urlencoded({ extended: false }))// extended: false - does not allow nested objects in query strings
app.use(express.json())// returns middleware that only parses JSON
// set up session
app.use(session({
  // genid: function (req) {
  //   return uuidv1()
  // },
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
  store: store,
  proxy: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false
  }
}))

// Routes
app.get('/', (req, res) => {
  res.send(`Hello World`)
})

// Controllers
const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)
const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const pollsController = require('./controllers/polls.js')
app.use('/polls', pollsController)

// Listen
app.listen(PORT, () => {
  console.log(`I'm listening on port ${process.env.PORT}`)
})
