require('dotenv').config()
const express = require('express')
const {extend} = require('lodash')
const {QuizData} = require('../models/quizdata.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')

const router = express.Router()

router.use(authenticateToken)

router.param('categoryId', async(req, res, next, categoryId)=>{
  try{
    let quizData = await QuizData.findOne({_categoryId: categoryId})

    if(!quizData){
      quizData = new QuizData({_categoryId:categoryId, questionset:[]})
      quizData = await quizData.save()
    }

    req.quizData = quizData
    next()
  }catch(err){
    res.status(400).json({success:false, message: 'Failed to access question for requested category! check error message for details', errorMessage: err.message})
  }
})

router.route('/:categoryId')
.get(async(req, res)=>{
  try{  
      let {quizData} = req 
      res.status(200).json({success:true, data: quizData})
    }catch(err){
      res.status(500).json({success:false, message:'Failed to retrieve data! Check error message for details', errorMessage: err.message})
    }
})
.post(async(req, res)=>{
  try{

    let {quizData} = req
    let {questionObj, action, questionId} = req.body
    let statusCode;

    switch(action){
      case "ADD_QUESTION":
        statusCode = 201
        quizData.questionset.push(questionObj)
        break;
      
      case "REMOVE_QUESTION":
        statusCode = 200
        quizData.questionset = quizData.questionset.filter(({_id})=> _id != questionId)
        break;
    }

    quizData = await quizData.save()
    res.status(statusCode).json({success:true, data: quizData})

  }catch(err){
     res.status(500).json({success:false, message:'Failed to update data! Check error message for details', errorMessage: err.message})
  }
})



module.exports = router