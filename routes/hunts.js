require('dotenv').config();
const express = require('express');
const hunts = express.Router();
const secret = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
// add pg file







module.exports = hunts;
