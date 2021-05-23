const mongoose = require('mongoose')
const {Schema} = mongoose
const {Category} = require('./category.model.js')

const LeaderboardSchema = new Schema({
  username: {
    type: String
  },

  quizplayed: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },

  score: {
    type: Number
  }
},
{
  timestamps: true
})

const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema)

module.exports = {Leaderboard}