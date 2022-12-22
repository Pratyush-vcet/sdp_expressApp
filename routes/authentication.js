/* eslint-disable no-undef */
const { Router } = require('express')
const users = require('../models/users')
const authRouter = Router()
const {encrypt, compare, createAccessToken} = require('../utils')

authRouter.post('/login', (req, res) => {
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.password)) {
        throw Error('email or password is not found')
      }
      return users.findOne({email: req.body.email})
    })
    .then((data) => {
      if (!data) {
        throw Error('User not found')
      }
      return compare(req.body.password, data.password)
    })
    .then((match) => {
      if (!match) {
        throw Error('invalid password')
      }
      return res.status(200).json({
        message: 'login successful',
        access_token: createAccessToken(req.body.email)
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'login failed',
        error: error.message
      })
    })
})

authRouter.post('/register', (req, res) => {
  return Promise.resolve()
    .then(() => {
      if (!(req.body.email && req.body.username && req.body.password)) {
        throw Error('email, username or password is not found')
      }
      return encrypt(req.body.password)
    })
    .then((hash) => {
      req.body.password = hash
      return users.create(req.body)
    })
    .then(data => {
      data = data.toJSON()
      delete data.password

      data.access_token = createAccessToken(req.body.email)

      return res.status(200).json({
        message: 'regestered successful',
        data: data
      })
    })
    .catch(error => {
      return res.status(422).json({
        message: 'register failed',
        error: error.message
      })
    })
})
authRouter.post('/verify', (req, res) => {
  return res.status(200).json({
    message: 'email verified successful'
  })
})

module.exports = authRouter
