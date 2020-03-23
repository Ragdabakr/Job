const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Job = require('../models/job');
const config = require('../config/db');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
const SMTP = require('nodemailer-smtp-transport');
const { authMiddleware } = require('../helpers/auth');
const cloudinary = require('cloudinary');
const NewJobsNotification = require('../models/newJobsNotification');
var nodemailer = require('nodemailer');
const Joi = require('joi');

// ---------------- Add Post---------------- 

cloudinary.config({ 
   cloud_name: 'dnf8ntdmr', 
   api_key: '563934858817624', 
   api_secret: 'jdWteSWvkd_CUuf4Dd7GO3lFYUc' 
 });


// ---------------- Find post-Job route---------------- 

router.post('/postJob', authMiddleware ,function(req,res){
    const userId = req.body.userId;
     const newJob = new Job();
     newJob.jobOwner = userId;
     newJob.email = req.body.jobForm.email;
     newJob.title = req.body.jobForm.title;
     newJob.location = req.body.jobForm.location;
     newJob.type = req.body.jobForm.type;
     newJob.category = req.body.jobForm.category;
     newJob.expDate = req.body.jobForm.expDate;
     newJob.job = req.body.jobForm.job;
     newJob.min = req.body.jobForm.min;
     newJob.max = req.body.jobForm.max;
     newJob.companyName = req.body.jobForm.companyName;
     newJob.createdAt = Date.now();
     newJob.save((err, newJob)=>{
      if(err){console.log(err);}
      User.findOne({_id:userId},(err, foundUser) =>{
        if(err){console.log(err);}
        foundUser.postedJobs.push(newJob);
        foundUser.save();
      });
     
     NewJobsNotification.find({},(err , NewJobsNotification) =>{
      if(err){console.log(err);}
      const filter = {
        keyword: newJob.title,
        location: newJob.location
      };
      NewJobsNotification = NewJobsNotification.filter(item => {
        for (let key in filter) {
          if (item[key] === undefined || item[key] != filter[key])
            return false;
        }
        return true;
      });
    //  console.log('mm',NewJobsNotification);
     var emailsArray = NewJobsNotification
    .map(item => ({ 
        userEmail: item.userEmail, 
    }));
      // console.log('nnnn',emailsArray);
      var ar = [];
      const emails = emailsArray.map(({ userEmail }) => userEmail);
        console.log(emails);
      if (NewJobsNotification.length > 0){
        console.log("send notification");
        const link = "http://localhost:4200/job-list";
        let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true,
        auth: {
            user: 'ragdabakr5@gmail.com', 
            pass: 'regorego1'
        },
        tls:{
          rejectUnauthorized:false
        }
      });
      let mailOptions = {
          from: '"Nodemailer Contact" <ragdabakr5@gmail.com>', // sender address
          to: emails ,
          subject: 'Jobico Job Alert', 
          html : "Hello,<br>new jobs a<br><a href="+link+">Click here to find jobs</a>" 
      };
     // console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
       return console.log(error);
      }    
        res.json("email send");
     });

     }else {
       console.log("dont send notification");
     }
     });
    });
});
// ---------------- Find create-profileForm route---------------- 

router.post('/create-profile', authMiddleware ,function(req,res){
  const userId = req.body.userId;
  User.findOne({_id:userId}, async function(err,foundUser){
      if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
       foundUser.profile.firstName = req.body.cvForm.firstName;
       foundUser.profile.email = req.body.cvForm.email;
       foundUser.profile.phoneCode = req.body.cvForm.phoneCode;
       foundUser.profile.phoneNumber= req.body.cvForm.phoneNumber;
       foundUser.profile.country = req.body.cvForm.country;
       foundUser.profile.city = req.body.cvForm.city;
       foundUser.profile.street = req.body.cvForm.street;
       foundUser.profile.about = req.body.text;

        foundUser.save();
        return  res.json(foundUser);
     });
});
// ---------------- Find create-profileForm route---------------- 

router.get('/openJobs/:userId', authMiddleware ,function(req,res){
  const userId = req.params.userId;
  User.findOne({_id:userId}).populate('postedJobs').exec(function(err,foundUser) {
      if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        return  res.json(foundUser.postedJobs);
     });
});
// ---------------- Find create-accountForm route---------------- 

router.post('/create-social', authMiddleware ,function(req,res){
  const user = res.locals.user;
  const socials = req.body.socialForm.socials; // array of skillName
  User.findOne({email:user.email}, async function(err,foundUser){
      if (err) {
          
        console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        //push array in to array
        await foundUser.profile.socials.push(...socials);
       foundUser.save();
       return  res.json(foundUser);
     });

});

// ---------------- Find create-bookmarkCompanies  route---------------- 

router.post('/create-bookmark-company', authMiddleware ,function(req,res){
  const user = res.locals.user;
  const companyId = req.body.companyId;
  User.findOne({email:user.email}, async function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        //push array in to array
        await foundUser.bookmarkCompanies.push(companyId);
       foundUser.save();
       return  res.json(foundUser);
     });
});

// ---------------- Delete-job route---------------- 

router.post('/delete-applayUser', authMiddleware ,function(req,res){
  const user = res.locals.user;
  const applayUser = req.body.applayUser; 
  const jobId = req.body.jobId; 
  Job.findOne({_id:jobId},function(err,foundJob){
      if (err) {
        console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        //pull object from array by item
       const arr = foundJob.jobApplicants.filter(x  => x.email !== applayUser);
       foundJob.jobApplicants = arr;
       foundJob.save();
       return  res.json(foundJob);
     });
});
// ---------------- Find edit-Account Form route---------------- 

router.post('/edit-account-form', authMiddleware ,function(req,res){
  const userId = req.body.userId;
  const cvForm = req.body.cvForm;
  const text = req.body.text;
  User.findOne({_id:userId}, function(err,foundUser){
    if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
     foundUser.profile.firstName = req.body.cvForm.firstName;
     foundUser.profile.email = req.body.cvForm.email;
     foundUser.profile.phoneCode = req.body.cvForm.phoneCode;
     foundUser.profile.phoneNumber= req.body.cvForm.phoneNumber;
     foundUser.profile.country = req.body.cvForm.country;
     foundUser.profile.city = req.body.cvForm.city;
     foundUser.profile.street = req.body.cvForm.street;
     foundUser.profile.about = req.body.text;

      foundUser.save();
      return  res.json(foundUser);
   });
});
// ---------------- Find edit-Social Form route---------------- 

router.post('/edit-social-form', authMiddleware ,function(req,res){
  const userId = req.body.userId;
  const socialForm = req.body.socialForm.socials[0];
  const socialId = req.body.socialId;
  User.findOne({_id:userId}, function(err,foundUser){
    if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      var foundSocial =  foundUser.profile.socials.filter(x => x.id === socialId);
      foundSocial[0].socialName = req.body.socialForm.socials[0].socialName;
      foundSocial[0].socialLink = req.body.socialForm.socials[0].socialLink;
      foundUser.save();
      return  res.json(foundUser);
   });
});
// ---------------- Find delete-Social route---------------- 

router.post('/delete-social', authMiddleware , function(req,res){
  const userId = req.body.userId; 
  const socialId = req.body.socialId;
  console.log('acdcdccwec',socialId );
  User.findById({_id : userId}, function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        const foundSocial = foundUser.profile.socials.filter(x => x._id !== socialId);
       console.log('accwec',foundSocial );
       foundUser.profile.socials = foundSocial;
       foundUser.save();
       return  res.json(foundUser);
   });
});

// ---------------- Find delete-userBokkmark route---------------- 

router.post('/delete-userBookmark', authMiddleware , function(req,res){
  const userId = req.body.userId; 
  const employeeId = req.body.employeeId;
  User.findById({_id : userId}, function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
      const foundbookmarkUsers = foundUser.bookmarkUsers.pull(employeeId);
       foundUser.profile.socials = foundbookmarkUsers;
       foundUser.save();
       return  res.json(foundUser);
   });
});


module.exports = router;