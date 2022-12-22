const { Router } = require('express')

const authRouter = Router()

authRouter.post('/login', (req, res) => {
  return res.status(200).json({
    message: 'login successful'
  })
})
authRouter.post('/register', (req, res) => {
  return res.status(200).json({
    message: 'registered successful'
  })
})
authRouter.post('/verify', (req, res) => {
  return res.status(200).json({
    message: 'email verified successful'
  })
})

module.exports = authRouter
