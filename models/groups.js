const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Questions = require('./questions')
// const Users = require('./users')

const groupsSchema = Schema({
  pollName: String, // where to go for lunch
  owner: String, // who made this poll
  active: {type: Boolean, default: true}, // is it active?
  deadline: Date, // when must voting be complete
  questions: [Questions.schema], // what are the options choices
  participants: [String] // who gets to vote in this?
}, {timestamps: true})

module.exports = mongoose.model('Group', groupsSchema)
