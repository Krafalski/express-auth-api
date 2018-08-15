const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Groups = require('./groups')

const userSchema = Schema({
  username: String,
  password: String,
  email: String,
  groups: [Groups.schema]
})

module.exports = mongoose.model('User', userSchema)
