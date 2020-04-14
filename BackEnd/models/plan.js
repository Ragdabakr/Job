const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const planSchema = new Schema({
  title : {type:String ,required:true,lowercase:true,},
  period : {type:String ,required:true,lowercase:true,},
  price : {type:String,required:true, },
  paypalPlanId : {type:String,required:true, },
  PlanItems:[{
    item:{type:String , required:true, }
  }], 
});


module.exports = Plan= mongoose.model('Plan', planSchema);