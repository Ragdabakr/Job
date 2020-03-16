const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require("./config/db");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require("cors");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const pdf = require('express-pdf');




// const methodOverride = require("method-override");

const app = express(); 
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: config.SECRET
}));


app.use(morgan('dev') );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(cors());
app.use(pdf);




// mongoose connect
mongoose.connect(config.mongoDbUrl ,{ useNewUrlParser: true } )
.then( 
	() => {
     
	});

// app.use('/api/v1/clients', require('./routes/clients'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/lookup', require('./routes/lookup'));
app.use('/api/v1/image', require('./routes/image'));
app.use('/api/v1/employee', require('./routes/employee'));
app.use('/api/v1/employeer', require('./routes/employeer'));
app.use('/api/v1/jobs', require('./routes/jobs'));

const PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
	console.log("running 3000");
});
