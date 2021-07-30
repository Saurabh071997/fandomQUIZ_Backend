require('dotenv').config()
const express = require('express')
const {Score} = require('../models/score.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')

const router = express.Router()

router.use('/users', authenticateToken)

router.use('/users', async (req, res, next)=>{
  try{
    let {userId} = req 
    let scores = await Score.findOne({__userId: userId})

    if(!scores){
      scores = new Score({__userId: userId, scorelist:[]})
      scores = await scores.save()
    }

    req.scores = scores
    next()

  }catch(err){
    res.status(400).json({success:false, message: 'Failed to access data for requested user', errorMessage: err.message})
  }
})


router.route('/users')
.get(async (req, res)=>{
  const {scores} = req
  res.status(200).json({success:true, data: scores })
})
.post(async (req, res)=>{
  try{
    let {scores} = req
    let newScoreObj = req.body

    scores.scorelist.push(newScoreObj)
    scores = await scores.save()

    res.status(201).json({success:true, data: scores})

  }catch(err){
    res.status(500).json({success:false, errorMessage:err.message})
  }
})


module.exports = router