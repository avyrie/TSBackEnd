const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    // Send an error is email is already in use
    if (foundUser) {
      res.status(400).json({
        status: 400,
        message: "Email address has already been registered. Please try again",
      });
    }

    // Creates salt for hash
    const salt = await bcrypt.genSalt(10);
    // Hashes user password
    const hash = await bcrypt.hash(req.body.password, salt);
    // Creates a user with a hashed password
    const newUser = await db.User.create({ ...req.body, password: hash });
    console.log(`This is newUser: `, newUser)
    const payload = {id: newUser._id};
    const secret = process.env.JWT_SECRET;
    const expiration = {expiresIn: "1h"};
  
    // Sign token
    const token = await jwt.sign(payload, secret, expiration);

    // Success
    return res.status(201).json({status: 201, message: "success"});
  } catch (error) {
    console.log(`Sign up error: `, error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


// LOGIN
const login = async (req, res) => {
  console.log(`This is the req.body: `, req.body);
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

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

    // Create token payload
    const payload = {id: foundUser._id};
    const secret = process.env.JWT_SECRET;
    const expiration = {expiresIn: "1h"};
    
    // Sign token
    const token = await jwt.sign(payload, secret, expiration);

    // Success
    res.status(200).json({"token": token, "id": foundUser._id});
  } catch (error) {
    console.log(`Login Error: `, error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


// Sign Up controller
const verify = async (req, res) => {
  // Get token from request header
  const token = req.headers['authorization'];
  console.log(`re.headers in verify: `, req.headers)
  console.log('Verify Token ---> ', token);

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({
        message: 'You are not authorized. Please login and try again'
      });
    }

    // add payload to req object
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
