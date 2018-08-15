const mongoose = require('mongoose')
const Schema = mongoose.Schema
const QuestionOptions = require('./question_options.js')

const questionsSchema = Schema({
  question: String,
  owner: String,
  questionOptions: [QuestionOptions.schema]
})

module.exports = mongoose.model('Question', questionsSchema)
