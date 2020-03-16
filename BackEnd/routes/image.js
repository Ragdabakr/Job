const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const { authMiddleware } = require('../helpers/auth');
const cloudinary = require('cloudinary');

// ---------------- Add Post---------------- 

cloudinary.config({ 
   cloud_name: 'dnf8ntdmr', 
   api_key: '563934858817624', 
   api_secret: 'jdWteSWvkd_CUuf4Dd7GO3lFYUc' 
 });

// ---------------- Upload images--------------- 

 router.post("/upload-image" ,authMiddleware , function(req,res){
   const user = res.locals.user;
   const userId = user.id;
   console.log(req.body.image);
cloudinary.uploader.upload(req.body.image,async (result) => {
   console.log('rr',result.version);
   User.findOne({_id:userId},async function(err,foundUser){
      if (err) {
          console.log(err);
        }
      foundUser.profile.profileimage.imageId = result.public_id;
      foundUser.profile.profileimage.imageVersion = result.version;
      foundUser.save();
        // console.log(foundUser);
        return  res.json(foundUser);
      }); 
    });
 });

 // ---------------- Upload pdf--------------- 

 router.post("/upload-pdf" ,authMiddleware , function(req,res){
  const user = res.locals.user;
  const userId = user.id;
cloudinary.uploader.upload(req.body.pdf,async (result) => {
  console.log("RESULLLLL",result);
  User.findOne({_id:userId},async function(err,foundUser){
     if (err) {
         console.log(err);
       }
     foundUser.profile.pdf.pdfId = result.public_id;
     foundUser.profile.pdf.pdfVersion = result.version;
     foundUser.save();
       return  res.json(foundUser);
     }); 
   });
});

 // ---------------- Set profile pic---------------- 

   router.get("/setProfile/:imageVersion/:imageId" ,authMiddleware , function(req,res){
      const user = res.locals.user;
      const imageVersion = req.params.imageVersion;
      const imageId = req.params.imageId;
      console.log(imageVersion,imageId);
      
      //  User.update({_id: user.id},{picVersion:imageVersion,picId:imageId} ,function(){});
       User.update({_id: user.id},{ $set:{'picVersion':imageVersion,'picId':imageId }},function(){});
    });

    
 // ---------------- Set messgae attachment ---------------- 

   router.post("/upload-message-pdf" ,authMiddleware , function(req,res){
    const user = res.locals.user;
    const pdf = req.body.pdf;
    const userId = user.id;

  // cloudinary.uploader.upload(req.body.pdf,async (result) => {
  //   console.log("message",result);
  //   User.findOne({_id:userId},async function(err,foundUser){
  //      if (err) {
  //          console.log(err);
  //        }
  //      foundUser.message.push({
  //        attachmentId : result.public_id,
  //        attachmentVersion : result.version,
  //      });
  //      foundUser.save();
  //        return  res.json(foundUser);
  //      }); 
  //    });
  });
   module.exports = router;