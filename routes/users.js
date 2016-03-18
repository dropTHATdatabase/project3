
require('dotenv').config();
const express = require('express');
const users = express.Router();
const secret = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./../db/users.js');

users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

users.get('/', expressJWT({ secret: secret }), db.list, (req,res)=>{
  var query = req.query.me;

  console.log('req.user: ', req.user)       // gets token info of the current user
  console.log('res.data: ', res.data)       // gets list of all users
  
  if(query) {
    res.json({ data: res.user })
  } else {
    res.json({ data: res.data })
  }
});

users.post('/', db.add,(req,res)=>{
  res.status(201).json({data:'success'});
});

users.post('/login', db.get, (req,res) =>{
  var token = jwt.sign(res.data, secret);
  res.json({agent: res.data, token: token });
});

// users.use('/me', expressJWT({secret: secret}));   // for decrypting user token!!!


module.exports = users;
