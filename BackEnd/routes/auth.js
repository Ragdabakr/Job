const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Verification = require('../models/verification');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
const SMTP = require('nodemailer-smtp-transport');
const { authMiddleware } = require('../helpers/auth');
const Joi = require('joi');
var refreshTokens = {} ;


// ---------------- Find register route---------------- 

router.post('/register',function(req,res){
    const {email ,password ,role} = req.body;
    if(!email || !password){
     return res.status(422).send({errors:[{title:'Data missing', detail:'الايميل وكلمه المرور مطلوبين'}]});
    }
  //check if password === pssword confirmation
    // if (password !== passwordConfirmation) {
    //   return res.status(422).send({errors: [{title: 'Invalid passsword!', detail: 'كلمه المرور غير متطابقه'}]});
    // } 
    if (!role) {
      return res.status(422).send({errors: [{title: 'Error', detail:' يجب اختيار نوع الحساب اما صاحب عمل او باحث عن عمل '}]});
    }

  // check if user is found {email:email}
     User.findOne({email},async function(err, existingUser) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      if (existingUser) {
        return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'الايميل مسجل من قبل'}]});
      }
      const user = new User({
        email,
        password,
        role
      });
      user.save(function(err){
        if (err){
          console.log(err);
        }
        
         const newVerification = new Verification();
            newVerification.user = user._id,
            newVerification.token = crypto.randomBytes(16).toString('hex')
            newVerification.save(function(err,newVerification){
            if(err){
                console.log(err);
            }
            
            var token = newVerification.token;
            const userEmail = user.email;
            // const link = "http://localhost:3000/api/v1/auth/confirmation?token=" + token + "&email="+ userEmail ;
            const link = "http://localhost:4200/login?token=" + token + "&email="+ userEmail ;
            // console.log("userEmail",userEmail ,"token" ,token);

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
              to: user.email,
              subject: 'Account Verification Token', 
              html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
          };
         // console.log(mailOptions);
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
           return console.log(error);
          }    
            res.json("email send");
             });
            });
          });
       });
     });

// ---------------- Verify confirmation email---------------- 

router.post("/confirmation" , (req,res) =>{
    const email = req.body.email;
    const token = req.body.token;
    return User.findOne({ email: req.body.email })
      .then(user => {
        if (user.isVerified) {
          return res.status(202).json(`Email Already Verified`);
        } else {
          return Verification.findOne({
              token: req.body.token 
          }).then((token) => {
              if(token){
                return user
                  .update({ isVerified: true })
                  .then(updatedUser => {
                    return res.status(403).json(`User with ${user.email} has been verified`);
                  })
                  .catch(reason => {
                    return res.status(403).json(`Verification failed`);
                  });
              } else {
                return res.status(404).json(`Token expired` );
              }
            })
            .catch(reason => {
              return res.status(404).json(`Token expired`);
            });
        }
      })
      .catch(reason => {
        return res.status(404).json(`Email not found`);
      });
  });

// ---------------- Find auth route ---------------- 
router.post('/login',function(req,res) {
  const { email, password } = req.body;
  User.findOne({email},function(error,user) {
    if(error) {
      return res.json({"error" : true,"message" : error});
    }
    if(!user) {
      return res.json({"error" : true,"message" : "User not found"});
    }
    if(user.password !== req.body.password) {
      return res.json({"error" : true,"message" : "Password mismatch"});
    }else{

      const token = jwt.sign({
        userId: user.id,
        email: user.email
      }, config.SECRET, { expiresIn: '1h'});
      return res.json(token);
    }
  });
});


// ---------------- Get user by id---------------- 

router.get("/user/:id" , (req,res) =>{
   User.findById({_id:req.params.id},function(err, user) {
    //  console.log(user);
     if(err){
       console.log(err);
     }
     res.json(user);
   });
});
module.exports = router;