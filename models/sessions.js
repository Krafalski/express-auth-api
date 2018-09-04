const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = Schema({
  any: {}
})

module.exports = mongoose.model('Session', sessionSchema)
