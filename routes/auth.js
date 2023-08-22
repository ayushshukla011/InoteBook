const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { default: mongoose } = require('mongoose');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const Jwt_secret = "ayushddhdia";


//ROUTE 1
//create a User using : POST '/auth'/Createuser doesn't require auth
router.post('/Createuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Enter valid password').isLength({ min: 6 })
], async (req, res) => {
  //req means request for data 
  //res means the final result
  let success=false;
  //checks the proper type  and return errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    
    return res.status(400).json({success, errors: errors.array() });
  }

  //checking user with same emails
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success=false;
      return res.status(400).json({ success,error: "sorry user with this email already exist" })
    }


    const salt = await bcrypt.genSalt(8);//return a prommise 
    const seccPass = await bcrypt.hash(req.body.password, salt)//return a promise

    //user creation 
    user = await User.create({
      name: req.body.name,
      password: seccPass,
      email: req.body.email
    })
    const data = {
      user: {
        id: user.id,
      }
    }

    const authToken = jwt.sign(data, Jwt_secret)
    success=true
    res.json({success,authToken});
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }

})



//ROUTE 2
//Authenticate a User using : POST '/auth/login' doesn't require login
router.post('/login', [

  body('email', 'Enter valid email').isEmail(),
  body('password', 'password can not be blank').exists(),
], async (req, res) => {

  let success=false;
  //checks the proper type  and return errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false
      return res.status(400).json({success, error: "Invalid credentials" })
    }
    const passwordcompare = await bcrypt.compare(password, user.password)

    if (!passwordcompare) {
      success=false
      return res.status(400).json({ success,error: "Invalid credentials" })
    }
    const data = {
      user: {
        id: user.id,
      }
    }

    const authToken = jwt.sign(data, Jwt_secret)
    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");

  }

})


//ROUTE 3
//Authenticate a User using : POST '/auth/getuser'  require login
router.post('/getUser', fetchuser, async (req, res) => {

  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }

})
module.exports = router