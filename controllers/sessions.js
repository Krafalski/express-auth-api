const express = require('express')
const sessions = express.Router()
const User = require('../models/users')

sessions.post('/', async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.body.username }
    )
    if (req.body.password === user.password) {
      req.session.currentUser = user
      res.status(200).json({message: 'successful log in', login: true})
    } else {
      res.status(418).json({message: 'wrong password'})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({message: 'session ended', login: false})
  })
})

module.exports = sessions
