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

// ---------------- Add Post---------------- 

cloudinary.config({ 
   cloud_name: 'dnf8ntdmr', 
   api_key: '563934858817624', 
   api_secret: 'jdWteSWvkd_CUuf4Dd7GO3lFYUc' 
 });


// ---------------- Find create-plan form route---------------- 

router.post('/create-planForm', authMiddleware ,function(req,res){
    const user = res.locals.user;
    const planItems = req.body.planForm.PlanItems;
         const plan = new Plan();
         plan.title = req.body.planForm.title;
         plan.price= req.body.planForm.price;
         plan.period = req.body.planForm.period;
         plan.paypalPlanId = req.body.planForm.paypalPlanId;
          //push array in to array
         plan.PlanItems.push(...planItems);
         console.log(plan);
         plan.save();
          User.findOne({_id:user.id}, async function(err,foundUser){
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
              }
              foundUser.plan = plan._id;
              foundUser.save();
            });
            res.json(plan);
});
// ---------------- Find plans route---------------- 

router.get('/plans', authMiddleware ,function(req,res){
Plan.find({},(err,plans)=>{
  if(err){
    return res.json({"error" : true,"message" : "there is no plans found"});
   }
   res.json(plans);
  });
});
// ---------------- Find plan route---------------- 
router.get('/plans/:planId', authMiddleware ,function(req,res){
  const planId = req.params.planId;
  Plan.findOne({_id:planId},(err,plan)=>{
    if(err){
      return res.json({"error" : true,"message" : "there is no plans found"});
     }
     res.json(plan);
    });
  });


module.exports = router;