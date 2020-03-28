const express = require('express');
const router = express.Router();
const User = require('../models/user');
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


// ---------------- Find create-profileForm route---------------- 

router.post('/create-profileForm', authMiddleware ,function(req,res){
    const user = res.locals.user;

    User.findOne({_id:user.id}, async function(err,foundUser){
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
         foundUser.profile.firstName = req.body.firstName;
         foundUser.profile.lastName = req.body.lastName;
         foundUser.profile.email = req.body.email;
         foundUser.profile.phoneCode = req.body.phoneCode;
         foundUser.profile.phoneNumber= req.body.phoneNumber;
          foundUser.save();
          return  res.json(foundUser);
       });
});
// ---------------- Find create-accountForm route---------------- 

router.post('/create-accountForm', authMiddleware ,function(req,res){
    const user = res.locals.user;
    
    User.findOne({_id:user.id}, async function(err,foundUser){
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          foundUser.profile.birthDate = req.body.birthDate;
          foundUser.profile.nationality  = req.body.nationality ;
          foundUser.profile.country= req.body.country;
          foundUser.profile.title = req.body.title;
          foundUser.profile.about = req.body.about;
          foundUser.save();
          return  res.json(foundUser);
       });
});

// ---------------- Find create-accountForm route---------------- 

router.post('/create-skillForm', authMiddleware ,function(req,res){
    const user = res.locals.user;
    const skills = req.body.skills; // array of skillName
    // console.log('xx',req.body.skills);
    User.findOne({email:user.email}, async function(err,foundUser){
        if (err) {
            
          console.log(err);
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          //push array in to array
          await foundUser.profile.skills.push(...skills);
         foundUser.save();
         return  res.json(foundUser);
       });
});

// ---------------- Find create-JobHistoryForm route---------------- 

router.post('/create-jobHistoriesForm', authMiddleware ,function(req,res){
    const user = res.locals.user;
    const JobHisories = req.body.jobHistories ; // array of Jobhistories
    User.findOne({email:user.email}, async function(err,foundUser){
        if (err) {
            console.log(err);
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          //push array in to array
          await foundUser.profile.jobHistories.push(...JobHisories );
         foundUser.save();
         return  res.json(foundUser);
       });
});

// ---------------- Find create-messageForm route---------------- 

// router.post('/create-messageForm', authMiddleware ,function(req,res){
//     const user = res.locals.user;
//     cloudinary.uploader.upload(req.body.pdf,async (result) => {
//     User.findOne({email:user.email}, async function(err,foundUser){
//         if (err) {
//             console.log(err);
//             return res.status(422).send({errors: normalizeErrors(err.errors)});
//           }
//           await foundUser.message.push({
//                 senderName:req.body.messageForm.name,
//                 senderEmail:req.body.messageForm.email,
//                 message : req.body.messageForm.message,
//                 senderId : user.id,
//                 recieverId : req.body.reciever,
//                 attachmentId : result.public_id,
//                 attachmentVersion : result.version,
//           });
//          foundUser.save();
//          return  res.json(foundUser);
//        });
//     });
// });


// ---------------- Find create-bookmarkUsers  route---------------- 

router.post('/create-bookmark-users', authMiddleware ,function(req,res){
    const user = res.locals.user;
    const userId = req.body.userId; 
    User.findOne({email:user.email}, async function(err,foundUser){
        if (err) {
            console.log(err);
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          //push array in to array
          await foundUser.bookmarkUsers.push(userId);
         foundUser.save();
         return  res.json(foundUser);
       });
});
// ---------------- Find edit-AccoutForm route---------------- 

router.post('/edit-CvForm', authMiddleware ,function(req,res){
    const id = req.body.userId; 
    User.findById({_id : id}, async function(err,foundUser){
        if (err) {
            console.log(err);
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          foundUser.profile.firstName = req.body.cvForm.firstName;
          foundUser.profile.lastName = req.body.cvForm.lastName;
          foundUser.profile.email = req.body.cvForm.email;
          foundUser.profile.phoneCode  = req.body.cvForm.phoneCode;
          foundUser.profile.phoneNumber = req.body.cvForm.phoneNumber;
          foundUser.profile.title  = req.body.cvForm.title;
          foundUser.profile.nationality = req.body.cvForm.nationality;
         foundUser.save();
         return  res.json(foundUser);
       });
});
// ---------------- Find edit-AboutForm route---------------- 

router.post('/edit-aboutForm', authMiddleware ,function(req,res){
    const id = req.body.userId; 
    User.findById({_id : id}, async function(err,foundUser){
        if (err) {
            console.log(err);
            return res.status(422).send({errors: normalizeErrors(err.errors)});
          }
          foundUser.profile.about = req.body.aboutForm.about;
         foundUser.save();
         return  res.json(foundUser);
       });
});

// ---------------- Find edit-JobHistoryForm route---------------- 

router.post('/edit-jobHistoryForm', authMiddleware ,function(req,res){
  const id = req.body.userId; 
  const jobHistoryId = req.body.jobHistoryId;
  User.findById({_id : id}, async function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
       const foundUpdatedJobHistory =  foundUser.profile.jobHistories.filter(x => x.id === jobHistoryId);
       foundUpdatedJobHistory[0].jobName = req.body.jobForm[0].jobName;
       foundUpdatedJobHistory[0].companyName = req.body.jobForm[0].companyName;
       foundUpdatedJobHistory[0].startYear = req.body.jobForm[0].startYear;
       foundUpdatedJobHistory[0].endYear = req.body.jobForm[0].endYear;
       foundUpdatedJobHistory[0].jobSummary = req.body.jobForm[0].jobSummary;
       foundUser.save();
       return  res.json(foundUser);
     });
});
// ---------------- Find edit-SkillForm route---------------- 

router.post('/edit-skillForm', authMiddleware ,function(req,res){
  const id = req.body.userId; 
  const skillId = req.body.skillId;
  User.findById({_id : id}, async function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
       const foundskill =  foundUser.profile.skills.filter(x => x.id === skillId);
       foundskill[0].skillName = req.body.skillForm.skills[0].skillName;
       foundUser.save();
       return  res.json(foundUser);
     });
});
// ---------------- Find delete-Skill route---------------- 

router.post('/delete-skill', authMiddleware ,function(req,res){
  const id = req.body.userId; 
  const skillId = req.body.skillId;
  User.findById({_id : id},  function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
       const foundSkill =  foundUser.profile.skills.filter(x => x.id === skillId);
       myArray = foundUser.profile.skills;
       const wantedSkills = myArray.filter(elm => elm.id !== skillId);
       foundUser.profile.skills = wantedSkills;
       foundUser.save();
       return  res.json(foundUser);
   });
});

//---------------- Find delete-job route---------------- 

router.post('/delete-job', authMiddleware ,function(req,res){
  const id = req.body.userId; 
  const idJobHistory = req.body.idJobHistory;
  User.findById({_id : id}, function(err,foundUser){
      if (err) {
          console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
       myArray = foundUser.profile.jobHistories;
       const wantedJobs = myArray.filter(elm => elm.id !== idJobHistory);
       foundUser.profile.jobHistories = wantedJobs;
       foundUser.save();
       return  res.json(foundUser);
   });
});
// ---------------- Delete-appaly-job route---------------- 

router.post('/delete-applay-job', authMiddleware ,function(req,res){
  const user = res.locals.user;
  const jobId = req.body.jobId; 
  User.findOne({email:user.email}, async function(err,foundUser){
      if (err) {
        console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        //pull array in to array
        await foundUser.applayforJobs.pull(jobId);
       foundUser.save();
       return  res.json(foundUser);
     });
     Job.findOne({_id:jobId}, async function(err,job) {
      if (err) {
        console.log(err);
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        console.log('job',job);
         job.jobApplicants.filter(x => x.userId !== user.id);
        job.save();
        return  res.json(job);
     });
});

module.exports = router;