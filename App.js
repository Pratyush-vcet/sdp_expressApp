/* eslint-disable no-multiple-empty-lines */
const authRouter = require('./routes/authentication')
const express = require('express')
const logger = require('./middlewares/logger')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const profileRouter = require('./routes/profile')

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const app = express()
connectDB()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(logger)

app.get('/greetings', (req, res) => {
  return res.status(200).json({
    message: 'Hello express project'
  })
})


app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)


app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('error', error)
  }
  console.log('Server running on ' + process.env.PORT)
})

module.exports = app
