const mongoose = require('mongoose')
const {Schema} = mongoose
const {Category} = require('./category.model.js')

const QuizAnswerSet = new Schema({
  value: {
    type:String
  },

  isCorrect: {
    type: Boolean
  }
})

const QuizQuestionSet = new Schema({
  question: {
    type: String
  },

  options: {
    type: [QuizAnswerSet],
    default: undefined
  }
})

const QuizDataSchema = new Schema({
  _categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },

  questionset: {
    type: [QuizQuestionSet],
    default: undefined
  }
},
{
  timestamps: true
})

const QuizData = mongoose.model('QuizData', QuizDataSchema)

module.exports = {QuizData}

