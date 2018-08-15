const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users')

users.post('/', async (req, res) => {
  try {
    req.body.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const user = await User.create(req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = users
