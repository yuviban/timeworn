const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
 
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    },
   
  });
  const User = mongoose.model('user',UserSchema);
  module.exports = User