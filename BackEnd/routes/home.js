const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Plan = require('../models/plan');
const config = require('../config/db');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
const SMTP = require('nodemailer-smtp-transport');
const { authMiddleware } = require('../helpers/auth');
const cloudinary = require('cloudinary');

// ---------------- Find plans route---------------- 

router.get('/paid-jobs', authMiddleware ,function(req,res){
User.find({isCompanyPlan:true},(err,users)=>{
  if(err){
    return res.json({"error" : true,"message" : "there is no jobs found"});
   }
   res.json(users);
  });
});
// ---------------- Find plan route---------------- 
router.get('/paid-employees', authMiddleware ,function(req,res){
  User.findOne({isEmployeePlan:true},(err,users)=>{
    if(err){
      return res.json({"error" : true,"message" : "there is no users found"});
     }
     res.json(users);
    });
  });
  // ---------------- Find jobs route---------------- 
router.get('/Jobs', authMiddleware ,function(req,res){
    Job.find({isCompanyPlan:true},(err,jobs)=>{
      if(err){
        return res.json({"error" : true,"message" : "there is no jobs found"});
       }
       res.json(Jobs);
      });
    });
    // ---------------- Find User route---------------- 
    router.get('/employees', authMiddleware ,function(req,res){
      User.findOne({},(err,users)=>{
        if(err){
          return res.json({"error" : true,"message" : "there is no users found"});
         }
         res.json(users);
        });
      });


module.exports = router;