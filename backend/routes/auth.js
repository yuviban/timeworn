const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { find } = require('../models/User');
var fetchuser = require('../middleware/fetchuser')

// ROUTE:1 Create a user using POST :"/api/auth/createuser" no login require
router.post('/createuser', [
   body('email', "Enter a valid email").isEmail(),
   body('password', "Password must be atleast 5 charecter").isLength({ min: 5 }),
   body('username', "Enter a valid username").isLength({ min: 3 }),
   body('firstname', "Enter a valid First Name").isLength({ min: 3 }),
   body('lastname', "Enter a valid Last Name").isLength({ min: 3 }),
], async (req, res) => {
   // if there are error,return bad request
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   // Try and Catching errors

   try {
      // Checking wether user with this username and email already exist
      let user = await User.findOne({ email: req.body.email });
      let username = await User.findOne({ username: req.body.username });
      if (req.body.password != req.body.confirmpassword) {

         return res.status(400).json({ error: "Password do not match" })
      }
      if (user) {
         return res.status(400).json({ error: "Sorry user with this email already exist" })
      }
      if (username) {
         return res.status(400).json({ error: "Sorry user with this username already exist" })

      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      // Creating user
      user = await User.create({
         username: req.body.username,
         password: secPass,
         email: req.body.email,
         firstname: req.body.firstname,
         lastname: req.body.lastname,
      })
      const data = {
         user: {
            id: user.id
         }

      }
      const JWT_SECRET = "shibdogeaxssandbtcethmanaenj";
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken })
   } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error");
   }
})

// ROUTE:2 Authenticate a user using POST :"/api/auth/login" no login require
router.post('/login', [
   body('email', "Enter a valid email").isEmail(),
   body('password', "Password cannot be blank").exists(),
], async (req, res) => {
   // if there are error,return bad request
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   const { email, password} = req.body;
   try {
      let user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ error: "Opps! email is incorrect" });
      }
     
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
         return res.status(400).json({ error: "Incorrect password" });
      }
      const data = {
         user: {
            id: user.id
         }

      }
      const JWT_SECRET = "shibdogeaxssandbtcethmanaenj";
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken })
   } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error");
   }

})


// ROUTE:3 Get user logedi  detail using POST :"/api/auth/getuser" login require

router.post('/getuser',fetchuser, async (req, res) => {
   try {
      userId =req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
   } catch (error) {
      console.error(error.message)
      res.status(500).send("Internal Server Error");
   }

})
module.exports = router