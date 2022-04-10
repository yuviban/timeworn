const mongoose = require('mongoose');
const { Schema } = mongoose;
const TeamsSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    teamname:{
        type:String,
        require:true,
    },
    teamdescription:{
        type:String,
        require:true,
    },
    teamcode:{
        type:String,
        require:true,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
   
  });
  const Teams = mongoose.model('teams',TeamsSchema);
  module.exports = Teams