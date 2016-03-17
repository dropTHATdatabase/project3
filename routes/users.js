require('dotenv').config();
const express = require('express');
const users = express.Router();
const secret = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./../db/users.js');

users.get('/', (req,res)=>{
  res.json({data:'success'});

});

users.post('/', db.add,(req,res)=>{
  res.status(201).json({data:'success'});
});

users.post('/login', db.get, (req,res) =>{
  var token = jwt.sign(res.data, secret);
  // console.log('res.data: ', res.data)
  // console.log('token: ', token)
  res.json({agent: res.data, token: token });
});

users.get('/test', (req,res)=>{
  console.log('token? ', req.user)
});

users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});
// users.use('/me', expressJWT({secret: secret}));   // for decrypting user token!!!


module.exports = users;
