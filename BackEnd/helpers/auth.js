
// ---------------- Middleware for saving user as locals to can access any ware ---------------- 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/db');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');


exports.authMiddleware = function(req, res, next) {

  const token = req.headers.authorization;
  if (token) {
    const user = parseToken(token) ;

    User.findOne({email:user.email}, async function(err,user){
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      // console.log("userrr",user);
      if (user) {
         //saving user
        res.locals.user = user;
        // console.log("userhelper",user);
        next();
      } else {
        return notAuthorized(res);
      }
    })
  } else {
    return notAuthorized(res);
}
};

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
}


