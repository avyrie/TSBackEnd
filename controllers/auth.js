const bcrypt = require('bcrypt');
const jwt = require("jwt-decode");
const db = require('../models');


const signup = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({message: 'All fields are required. Please try again'});
  }

  if (req.body.password.length < 4) {
    return res.status(400).json({message: 'Password must be at least 4 characters long'});
  }

  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (foundUser) {
      res.status(400).json({
        status: 400,
        message: "Email address has already been registered. Please try again",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    await db.User.create({ ...req.body, password: hash });

    const payload = {id: foundUser._id};
    const secret = process.env.JWT_SECRET;
    const expiration = {expiresIn: "1h"};
  
    // SIGN TOKEN
    const token = await jwt.sign(payload, secret, expiration);

    // success
    return res.status(201).json({status: 201, message: "success"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
  

};

// login
const login = async (req, res) => {
  console.log(req.body);
  try {
    const foundUser = await db.User.findOne({ username: req.body.username });

    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        message: "Username or password is incorrect"
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Username or password is incorrect",
      });
    }

    // CREATE TOKEN PAYLOAD
    const payload = {id: foundUser._id};
    const secret = process.env.JWT_SECRET;
    const expiration = {expiresIn: "1h"};
    
    // SIGN TOKEN
    // const token = await jwt.sign(payload, secret, expiration);

    // success
    res.status(200).json({token});
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


// REGISTER CONTROLLER
const verify = async (req, res) => {
  // GET TOKEN FROM REQUEST HEADER
  const token = req.headers['authorization'];
  console.log(req.headers)
  console.log('Verify Token ---> ', token);

  // VERIFY TOKEN
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({
        message: 'You are not authorized. Please login and try again'
      });
    }

    // payload
    req.currentUser = decodedUser;
    const payload = {id: foundUser._id};
    const secret = process.env.JWT_SECRET;
    const expiration = {expiresIn: "1h"};
    // const token = await jwt.sign(payload, secret, expiration);
    // success
    res.status(200).json({user: decodedUser});

    // next();
  });
};


module.exports = {
  signup,
  login,
  verify,
};
