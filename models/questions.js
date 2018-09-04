const mongoose = require('mongoose')
const Schema = mongoose.Schema
const QuestionOptions = require('./question_options.js')

const questionsSchema = Schema({
  question: String, // where to go for lunch?
  owner: String, // who owns this?
  questionOptions: [QuestionOptions.schema] // the options
})

module.exports = mongoose.model('Question', questionsSchema)
