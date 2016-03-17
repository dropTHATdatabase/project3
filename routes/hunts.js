require('dotenv').config();
const express = require('express');
const hunts = express.Router();
const secret = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
// add pg file

// route to get list of hunts for user
// db function to be added
hunts.get('/', (req,res)=>{
  res.json({data:res.data});
});

// route to add a new hunt for the user
// db function to be added
hunts.post('/', (req,res)=>{
  res.status(201).json({data:'success'});
});


//route to get hunt and clues for the players( has to be one object)
// db function to be added
hunts.get('/:id',(req,res)=>{
  res.json({data:res.data});
});

// route for the edit the hunt for the creator
// db function to be added
hunts.put('/:id',(req,res)=>{
  res.json({data:res.data});
});

// route to delete a hunt
// db function to be added
hunts.delete('/:id',(req,res)=>{
// should we be sending anything back
  res.status(201).json({data:'success'});
});









module.exports = hunts;
