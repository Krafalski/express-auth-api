const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Questions = require('./questions')
// const Users = require('./users')

const groupsSchema = Schema({
  name: String,
  owner: String,
  active: Boolean,
  deadline: Date,
  questions: [Questions.schema],
  participants: [String]
}, {timestamps: true})

module.exports = mongoose.model('Group', groupsSchema)
