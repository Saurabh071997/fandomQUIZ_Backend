const mongoose = require('mongoose')
const {Schema} = mongoose

const {User} = require('./user.model.js')
const {Category} = require('./category.model.js')

const ScoreListSchema = new Schema({
  __quizId: {
      type: Schema.Types.ObjectId,
      ref:'Category'
  },

  score: {
    type: Number
  },

  dateplayed:{
    type: String
  }
})

const ScoreSchema = new Schema({
   __userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  scorelist : {
    type:[ScoreListSchema],
    default: undefined
  }
},
{
  timestamps: true
})

const Score = mongoose.model('Score', ScoreSchema)

module.exports = {Score}