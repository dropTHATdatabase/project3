'use strict'
const express     = require('express');
const users       = express.Router();
const bodyParser  = require('body-parser');
const pgp         = require('pg-promise');
const db          = require('./../db/users.js');
const secret      = process.env.SECRET;
const expressJWT  = require('express-jwt');
const jwt         = require('jsonwebtoken');

// add new user
users.post('/', db.add, (req,res)=>{
  console.log(res.data)
  // res.json(res.data)    // res.data = { user_id, username }
});

// get user token
users.post('/login', db.get, (req,res)=>{
  var token = jwt.sign(res.data, secret)        // hashed password
  res.json({ success: true, 
             data: res.data,
             token: token    })
});

users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});
// users.use('/me', expressJWT({secret: secret}));

// users.post('/login', db.loginUser, (req,res)=>{
//   var token = jwt.sign(res.rows, secret)              // hashed password
//   res.json({ agent: res.rows, token: token })
// });


module.exports = users;
