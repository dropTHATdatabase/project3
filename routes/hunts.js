require('dotenv').config();
const express = require('express');
const hunts = express.Router();
const secret = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./../db/hunts.js');

// Error handling for authorization
hunts.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

// Use expressJWT for all hunts routes
hunts.use(expressJWT({secret: secret}));

// route to get list of hunts for user
// db function to be added
hunts.get('/', db.list, (req,res)=>{
  res.json({data:res.data});
});

// route to add a new hunt for the user
// db function to be added
hunts.post('/', db.add, (req,res)=>{
  res.status(201).json({data:'success'});
});


//route to get hunt and clues for the players( has to be one object)
// db function to be added
hunts.get('/:id', db.get, (req,res)=>{
  res.json({data:res.data});
});

// route for the edit the hunt for the creator
// db function to be added
hunts.put('/:id', db.update, (req,res)=>{
  res.json({data:res.data});
});

// route to delete a hunt
// db function to be added
hunts.delete('/:id', db.remove, (req,res)=>{
// should we be sending anything back
  res.status(201).json({data:'success'});
});









module.exports = hunts;
