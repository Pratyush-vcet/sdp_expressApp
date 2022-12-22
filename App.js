const authRouter = require('./routes/authentication')
const express = require('express')
const logger = require('./middlewares/logger')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(logger)

app.get('/greetings', (req, res) => {
  return res.status(200).json({
    message: 'Hello express project'
  })
})

app.use('/api/auth', authRouter)

app.listen(process.env.PORT, (error) => {
  if (error) {
    console.log('error', error)
  }
  console.log('Server running on ' + process.env.PORT)
})
