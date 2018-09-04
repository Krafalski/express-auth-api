const express = require('express')
const polls = express.Router()

// localhost:3001/polls POST
polls.post('/', (req, res) => {
  console.log(req.body)
  // take req.body and stuff it in our database
  res.send(req.body)
})

module.exports = polls
