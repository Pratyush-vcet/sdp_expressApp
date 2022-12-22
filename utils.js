/* eslint-disable no-unreachable */
const bcrypt = require('bcrypt')

const encrypt = (text) => {
  return bcrypt.genSalt(5)
    .then(salt => {
      return bcrypt.hash(text, salt)
    })
}
const compare = (text, hash) => {
  return bcrypt.compare(text, hash)
}
module.exports = {
  encrypt,
  compare
}
