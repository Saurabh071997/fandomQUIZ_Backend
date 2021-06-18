const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
  avatarname: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String, 
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required:true
  },

  firstname: {
    type: String
  },

  lastname: {
    type: String
  },

  contact: {
    type: String
  }

},
{
  timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = {User}