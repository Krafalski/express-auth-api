const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users')
const Session = require('../models/sessions')

sessions.post('/', async (req, res) => {
  console.log(req.sessionID)
  try {
    const user = await User.findOne(
      { username: req.body.username }
    )
    if (bcrypt.compareSync(req.body.password, user.password)) {
      req.session.currentUser = user
      req.session.sessionID = req.sessionID
      console.log(req.session)
      res.status(200).json({user: user.username, login: true})
    } else {
      res.status(418).json({message: 'wrong password'})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

sessions.get('/', async (req, res) => {
  console.log('sessionID', req.sessionID)
  const sesh = await Session.findOne({sessionID: req.sessionID})
  console.log('sesh', sesh)
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({message: 'session ended', login: false})
  })
})

module.exports = sessions
