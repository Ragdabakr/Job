const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const jobSchema = new Schema({
 
  jobOwner:{ type: Schema.Types.ObjectId, ref: 'User' },

  title: {
    type: String,
    required:true,
    lowercase:true,
  },
  email: {
    type: String,
    required:true
  },
  location: {
    type: String,
    required:true,
    lowercase:true,
  },
  max: {
    type: String,
    required:false
  },
  min: {
    type: String,
    required:false
  },
  type: {
    type: String,
    required:true
  },
  category: {
    type: String,
    required:true
  },
  job: {
    type: String,
    required:true
  },
  companyName: {
    type: String,
    required:true
  },
  createdAt :{
      type:Date,default:Date.now
  },
  expDate : {type:Date},
  jobApplicants:[{
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    email:{type:String,required:true,},
    phoneCode:{type:String,required:true,},
    phoneNumber:{type:String,required:true,},
    name:{type:String,required:true,},
    cvVersion:{type:String,required:true, },
    cvId:{type:String ,required:true, },
    created:{type:Date ,default:Date.now()},
  }],

    });

module.exports = Job= mongoose.model('Job', jobSchema);