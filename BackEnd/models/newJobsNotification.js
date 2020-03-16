const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const newJobsNotificationSchema = new Schema({

  keyword : {type:String ,required:true,lowercase:true,},
  location : {type:String ,required:true,lowercase:true,},
  userEmail : {type:String,required:true, },


});



module.exports = NewJobsNotification= mongoose.model('NewJobsNotification', newJobsNotificationSchema);