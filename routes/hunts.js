require('dotenv').config();
const express = require('express');
const hunts = express.Router();
const secret = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./../db/hunts.js');

hunts.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

// Use expressJWT for all hunts routes
hunts.use(expressJWT({secret: secret}));

// route to get list of hunts for user
hunts.get('/', db.list, (req,res)=>{
  // req.user = 1
  // res.data = { user_id, username, pw_digest, hunts: completed, entered, won}
  // console.log('hunt GET route: ', data)
  console.log(req.user)
  res.json({success: true, data:res.data});
});

// route to add a new hunt for the user
hunts.post('/', db.add, (req,res)=>{
  res.status(201).json({success: true, data: res.data});
});


//route to get hunt and clues for the players( has to be one object)
hunts.get('/:id', db.get, (req,res)=>{
  res.json({success: true, data:res.data});
});

// route for the edit the hunt for the creator
hunts.put('/:id', db.update, (req,res)=>{
  res.json({success: true, data:res.data});
});

// route to delete a hunt
hunts.delete('/:id', db.remove, (req,res)=>{
  res.status(201).json({success: true, data:'success'});
});

// Route to complete a clue
hunts.put('/:huntId/clues/:id', db.completeClue, (req, res) => {
  res.status(201).json({success: true, data: res.data});
});


module.exports = hunts;
