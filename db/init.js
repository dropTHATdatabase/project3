'use strict';

const path = require('path');
const db = require(path.join(__dirname, 'index.js'));

db.tx(function(t){

  var q1 = this.users.create().
  then(() => {
    console.log('users table created');
  });
  var q2 = this.hunts.create()
  .then(() => {
    console.log('hunts table created');
  });
  var q3 = this.clues.create()
  .then(() => {
    console.log('clues table created');
  });
  var q4 = this.participants.create()
  .then(() => {
    console.log('participants table created');
  });
  var q5 = this.clues_users.create()
  .then(() => {
    console.log('clues_users table created');
  });

  return this.batch([q1, q2, q3, q4, q5]);
}).
  then(() => {
    console.log('done');
    process.exit();
  })
  .catch((err) => {
    console.error('there was an error building the database');
    process.exit(1);
  });
