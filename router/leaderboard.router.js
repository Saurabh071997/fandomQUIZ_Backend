const express = require('express')
const {extend} = require('lodash')

const {Leaderboard} = require('../models/leaderboard.model.js')

const router = express.Router()

router.route('/')
.get(async(req, res)=>{
  try{
    const leaderboardResult = await Leaderboard.find({})
    res.status(200).json({success:true, data: leaderboardResult})
  }catch(err){
    res.status(500).json({success:false, message:'Failed to retrieve data! check error message for details', errorMessage: err.message})
  }
})
.post(async(req, res)=>{
  try{
    let leaderboardObj = req.body
    leaderboardObj = new Leaderboard(leaderboardObj)
    const savedObj = await leaderboardObj.save()
    res.status(201).json({success:true, data: savedObj})
  }catch(err){
    res.status(500).json({success:false, message:'Failed to save data! check error message for details', errorMessage: err.message})
  }
})

module.exports = router