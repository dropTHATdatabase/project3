'use strict';

const path = require('path');
const db = require(path.join(__dirname, 'index.js'));

// Create the users table and exit application
// Only intended to be run from the console
db.users.create()
  .then(() => {
    db.hunts.create()
      .then(() => {
        console.log('hunts table created');
        db.clues.create()
          .then(() => {
            console.log('clues table created');
            db.participants.create()
              .then(() => {
                console.log('participants table created');
                process.exit();
              }).catch(console.log);
          }).catch(console.log);
      }).catch(console.log);
    console.log('users table created');
  }).catch(console.log);
