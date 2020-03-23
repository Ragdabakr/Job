const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');
const NewJobsNotification = require('../models/newJobsNotification');
const config = require('../config/db');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
const SMTP = require('nodemailer-smtp-transport');
const { authMiddleware } = require('../helpers/auth');
const cloudinary = require('cloudinary');

// ---------------- Add Post---------------- 

cloudinary.config({ 
   cloud_name: 'dnf8ntdmr', 
   api_key: '563934858817624', 
   api_secret: 'jdWteSWvkd_CUuf4Dd7GO3lFYUc' 
 });
// ---------------- Find Job-list route sorting by date ---------------- 

router.get('/job-list',function(req,res){
    Job.find({}).sort({createdAt: -1}).exec((err, jobs) =>{
     if(err){console.log(err);
    }
     res.json(jobs);
    });
});

 // ---------------- Find Search Jobs---------------- 
 router.get('/',function(req,res){
    const keyword = req.query.keyword;
    const location = req.query.location;
    const type = req.query.type;
    const query = {
     title:keyword.toLowerCase(),
     location:location.toLowerCase(),
    }; 
    Job.find(query)     
    .exec(function(err,foundJobs){
        if(err){
       return res.status(422).send({errors: normalizeErrors(err.errors)});
         } 
        return  res.json(foundJobs);
   });
 
 });

  // ---------------- Find Search Jobs---------------- 
  router.post('/sendNotificationEmail',authMiddleware ,function(req,res){
    const user = res.locals.user;
    const keyword = req.body.keyword;
    const location = req.body.location;
    const query = {
     title:keyword.toLowerCase(),
     location:location.toLowerCase(),
    }; 
   const  newJobsNotification = new NewJobsNotification();
   newJobsNotification.keyword  = keyword;
   newJobsNotification.location = location;
   newJobsNotification.userEmail= user.email;
   newJobsNotification.save((err, notification) =>{
    if(err){
      console.log(err);
    }
   });
  });
  // ---------------- Find Search Jobs---------------- 
  router.get('/job-details/:id',function(req,res){
   const jobId = req.params.id;
   Job.findOne({_id:jobId}).populate('user').exec(function(err,job){
   if(err){console.log(err); }
   res.json(job);
    });
  });

  // ---------------- Applay for job---------------- 
  router.post('/applay-job/:jobId' ,function(req,res){
    const jobId = req.params.jobId;
    const cv = req.body.pdf;
    const applayData = req.body.applayJob;
    Job.findOne({_id:jobId}, async (err, foundJob) =>{
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      cloudinary.uploader.upload(cv, async (result) => {
        console.log(result.version , result.public_id);
      await foundJob.jobApplicants.push({
       name:applayData .name,
       email:applayData.email,
       phoneCode:applayData.phoneCode,
       phoneNumber:applayData.phoneNumber,
       cvId:result.public_id,
       cvVersion:result.version,
       created:Date.now(),
       });
      foundJob.save();
      console.log('foundJob',foundJob.jobApplicants);
     });
    });
   });
   // ---------------- Applay for job---------------- 
  router.post('/userApplay' ,authMiddleware,function(req,res){
    const user = res.locals.user;
    const jobId = req.body.jobId;
    const userData = req.body.userData.profile;
    Job.findOne({_id:jobId}, async (err, foundJob) =>{
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      await foundJob.jobApplicants.push({
       userId:user.id,
       name:userData.firstName,
       email:userData.email,
       phoneCode:userData.phoneCode,
       phoneNumber:userData.phoneNumber,
       cvId:userData.pdf.pdfId,
       cvVersion:userData.pdf.pdfVersion,
       created:Date.now(),
       });
      foundJob.save();
      User.findOne({_id:user.id}, async (err, foundUser) =>{
        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
       await foundUser.applayforJobs.push(foundJob);
       foundUser.save();
      });
    });
 });
  // ---------------- Find similler Jobs---------------- 
  router.get('/simillerJobs',function(req,res){
    const key = req.query.key;
    const query = {
     title:key,
    }; 
    Job.find(query).limit(3).sort({createdAt: -1})    
    .exec(function(err,foundJobs){
        if(err){
       return res.status(422).send({errors: normalizeErrors(err.errors)});
         } 
        return  res.json(foundJobs);
   });
 
 });
module.exports = router;