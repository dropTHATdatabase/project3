'use strict';

const path = require('path');
const db = require(path.join(__dirname, 'index.js'));

// Create the users table and exit application
// Only intended to be run from the console
db.users.create()
  .then(() => {
    console.log('users table created');
    process.exit();
  })
  .catch((err) => {
    console.error('There was an error creating users table ', err);
    process.exit(1);
  });
