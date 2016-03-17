require('dotenv').config();
'use strict'
const express     = require('express');
const logger      = require('morgan');
const path        = require('path');
const bodyParser  = require('body-parser');
const app         = express();
// add pg file 

const userRoutes = require( path.join(__dirname, '/routes/users'));
const huntRoutes = require( path.join(__dirname, '/routes/hunts'));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);      
app.use('/api/v1/hunts', huntRoutes);

// HOMEPAGE
app.get('/', (req, res) => {
  res.sendFile('index.html');
});


var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server UP!! ', port);
});
