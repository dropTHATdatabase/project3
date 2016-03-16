'use strict';

const path = require('path');
const db = require('./index');
const auth = require(path.join(__dirname, '../auth/index'));

function add(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  auth.getHashedPassword(password)
    .then((hash) => {
      db.users.add({username: username, password_digest: hash})
        .then((user) => {
          res.data = user;
          next();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({success: false, data: 'Server error'});
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({success: false, data: 'Server error'});
    });
}

function get(req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  auth.getHashedPassword
    .then((hash) => {
      db.users.get(username)
      .then((user) => {
        if(!user) { // Username not found
          res.status(401)
            .json({success: false, data: 'invalid username/password'});
        }
        auth.comparePassword(password, hash)
        .then((valid) => {
          if(!valid) { // Bad password
            res.status(401)
              .json({success: false, data: 'invalid username/password'});
          }
          res.data = user;
          next();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({success: false, data: 'server error'});
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({success: false, data: 'server error'});
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({success: false, data: 'server error'});
    });
}

module.exports = {
  get: get,
  add: add
};
