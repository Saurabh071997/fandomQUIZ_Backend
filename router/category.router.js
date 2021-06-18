const express = require('express')
const {extend} = require('lodash')
const {Category} = require('../models/category.model.js')

const router = express.Router()

router.route('/')
.get(async (req,res)=>{
  try{
    const categories = await Category.find({})
    res.status(200).json({success:true, data: categories})
  }catch(err){
    res.status(500).json({success:false, message:'Failed to access data! Check error message for details', errorMessage: err.message})
  }
})
.post(async(req, res)=>{
  try{
    const newCategoryObj = req.body
    const categoryObj = new Category(newCategoryObj)
    const savedObj = await categoryObj.save()
  
    res.status(201).json({sucess:true, data: savedObj})

  }catch(err){
    res.status(500).json({success:false, message:"Failed to add data! check error message for details",errorMessage:err.message})
  }
})

router.param('categoryId', async (req, res, next, categoryId) =>{
  try{
    const category = await Category.findById(categoryId)
  
    if(!category){
      return res.status(400).json({success:false, errorMessage: `No Category with id ${categoryId} exists`})
    }

    req.category = category

    next()
  }catch(err){
    res.status(400).json({success:false, message:`No Category with id ${categoryId} exists`, errorMessage:err.message})
  }
})

router.route('/:categoryId')
.get((req, res)=>{
  try{
    let {category} = req
    category.__v = undefined
    res.status(200).json({success:true , data: category })
  }catch(err){
    res.status(500).json({success:false, message:`Failed to retrieve data`, errorMessage:err.message})
  }
})
.post(async (req, res)=>{
  try{  
    const categoryUpdate = req.body
    let {category} = req

    category = extend(category, categoryUpdate)
    category = await category.save()

    res.status(201).json({success:true, data: category})  
  }catch(err){
    res.status(500).json({success:false, message:`Failed to update data`, errorMessage:err.message})
  }
})
.delete(async (req, res)=>{
  try{  
    let {category} = req;
    category = await category.remove();
    category.deleted = true;
    res.status(200).json({success:true, deleted_data: category})
  }catch(err){
    res.status(500).json({success:false, message:`Failed to delete data`, errorMessage:err.message})
  }
})


module.exports = router