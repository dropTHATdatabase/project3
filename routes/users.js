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
  res.json(res.data)    // res.data = { user_id, username }
});

// get user token
users.post('/login', db.get, (req,res)=>{
  var token = jwt.sign(res.data, secret)        // hashed password
  console.log('login res.data: ', res.data)
  console.log('login token: ', token)
  res.json({ agent: res.data, token: token })
});

users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

module.exports = users;
