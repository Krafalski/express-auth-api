const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionsOptionSchema = Schema({
  option: String, // choice for lunch
  voters: Number, // number of votes it got
  eliminated: {type: Boolean, default: false}
})

module.exports = mongoose.model('QuestionOption', questionsOptionSchema)
