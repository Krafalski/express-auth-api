const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionsOptionSchema = Schema({
  option: String,
  voters: Number,
  eliminated: {type: Boolean, default: false}
})

module.exports = mongoose.model('QuestionOption', questionsOptionSchema)
