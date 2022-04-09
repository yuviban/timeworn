const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");

// Create a user using POST :"/api/auth/createuser" dosent require auth
router.post('/createuser',[
   body('email',"Enter a valid email").isEmail(),
   body('password', "Password must be atleast 5 charecter").isLength({ min: 5 }),
   body('username',"Enter a valid username").isLength({ min: 3 }),
   body('firstname',"Enter a valid First Name").isLength({ min: 3 }),
   body('lastname',"Enter a valid Last Name").isLength({ min: 3 }),
],async (req,res)=>{
   // if there are error,return bad request
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   try {
      
  
   let user = await User.findOne({email:req.body.email});
   let user2 = await User.findOne({username:req.body.username});
   if (user){
      return res.status(400).json({error:"Sorry user with this email already exist"})
   }
   if(user2){
      return res.status(400).json({error:"Sorry user with this username already exist"})

   }
      user = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
    res.json(user)
   } catch (error) {
      console.error(error.message)
      res.status(500).send("Some error occured");
   }
})
module.exports = router