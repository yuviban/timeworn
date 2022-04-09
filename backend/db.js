const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://yuvi:YuvrajSingh9977@cluster0.jfx9s.mongodb.net/UsersData?retryWrites=true&w=majority";

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected sucesfully");
    })
}
module.exports = connectToMongo;
