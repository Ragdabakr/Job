const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const userSchema = new Schema({

  username:{
    type: String,
    min:[4, 'Too long,min is 4 chracters'],
    max:[32, 'Too long,max is 32 chracters'],
   
  },
  email:{ 
    type: String,
    min:[4, 'Too long,min is 4 chracters'],
    max:[32, 'Too long,max is 32 chracters'],
    unique : true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  password:{ 
    type: String,
    min:[4, 'Too long,min is 4 chracters'],
    max:[32, 'Too long,max is 32 chracters'],
  },
 
  role: {
    type: String,
    required:true
  },

  isVerified: { type: Boolean, default: false },
  verifcation:{
    verificationToken: { type: Schema.Types.ObjectId, ref: 'Verification' },
  },

  profile:{
      firstName : {type:String},
      lastName : {type:String},
      email:{type:String},
      phoneCode: {type:String},
      phoneNumber:{type:String},
      birthDate : {type:Date},
      nationality : {type:String},
      country: {type:String},
      city: {type:String},
      street: {type:String},
      title: {type:String},
      about: {type:String},
      skills:[{
        skillName:{type:String},
      }],
      socials:[{
        socialName:{type:String},
        socialLink:{type:String},
      }],
      jobHistories:[{
          jobName: {type:String},
          companyName:{type:String},
          startYear: {type:Date},
          endYear: {type:Date},
          jobSummary: {type:String},
      }],
      profileimage:{
        imageVersion:{type:String,default: '1555401575'},
        imageId:{type:String,default: 'images.png'}
      },
      pdf : {
         pdfVersion:{type:String},
         pdfId:{type:String},
    },


},

bookmarkUsers :[{
 type: Schema.Types.ObjectId, ref: 'User' 
}],
bookmarkCompanies:[{
  type: Schema.Types.ObjectId, ref: 'User' 
 }],
postedJobs:[{
  type: Schema.Types.ObjectId, ref: 'Job' 
}],
applayforJobs:[{
  type: Schema.Types.ObjectId, ref: 'Job' 
 }],
 chatList:[{
  reciever: { type: Schema.Types.ObjectId, ref: 'User' },
  recieverName:{type:String},
  message:{type:String},
  msg: { type: Schema.Types.ObjectId, ref: 'Message' },
  read :{type:Boolean,default :false},
 }],

 conversationList:[{
    type: Schema.Types.ObjectId, ref: 'Message' 
 }],


});

//comparing correct password
//--------------------------

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password); 
}

//hashing password after saving user in db
//------------------------------------------

userSchema.pre('save',function(next){

  const user = this;
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
    });
  });
});

module.exports = User= mongoose.model('User', userSchema);