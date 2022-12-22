const mongoose = require('mongoose')
module.exports = () => {
  mongoose.connect(process.env.MONGO_URI, (error) => {
    if (error) {
      console.log('database connection failed')
      throw error
    }
    console.log('database connected')
  })
}
