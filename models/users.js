/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')
const { generateOtp } = require('../utils')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: String
  }
})

schema.pre("save",function() {
  this.otp = generateOtp()
})

module.exports = mongoose.model('user', schema)
