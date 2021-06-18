const mongoose = require('mongoose')
const {Schema} = mongoose

const {User} = require('./user.model.js')
const {Category} = require('./category.model.js')

const LeaderboardSchema = new Schema({
  
  useravatar: {
    type: String
  },

  __quizId: {
      type: Schema.Types.ObjectId,
      ref:'Category'
  },

  score: {
    type:Number
  }

},
{
  timestamps: true
})

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema)

module.exports = {Leaderboard}