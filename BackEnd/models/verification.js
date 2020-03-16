const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;


const verificationSchema = new Schema({
  user:{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  token:{ 
    type: String,
  },


});


module.exports = Verification = mongoose.model('Verification', verificationSchema);