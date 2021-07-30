const express = require('express')
const {extend} = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user.model.js')

const router = express.Router()

router.route('/')
.get((req, res) => {
  res.json({message:'user signup api'})
})
.post(async (req, res)=>{
  try{
    const newUserObj = req.body
    // const userObj = await User.findOne({email:newUserObj.email})
    const userObj = await User.findOne({$or: [{email: newUserObj.email},{avatarname: newUserObj.avatarname}]})
    if(userObj){
      return res.status(409).json({success:false, errorMessage:"User already exists" })
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(newUserObj.password, salt)

    const newUser = new User({email:newUserObj.email, 
    avatarname:newUserObj.avatarname,
    password:hashedPassword})
    const savedData = await newUser.save()

    const userId = savedData._id
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN, {expiresIn:'24h'})

    res.status(201).json({success:true, newUser: savedData, accessToken})
  }catch(err){
    res.status(500).json({success:false, errorMessage:err.message})
  }
})

module.exports = router