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

  auth.getHashedPassword(password)
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

function list(req, res, next){
  var query;
  // If me=true in the query string get the current user
  // from the token as an array with one object
  // else get a list of all users as an array
  if (req.query.me) {
    query = db.users.findById(req.user.user_id);
  } else {
    query = db.users.list();
  }

  query.then((users) => {
    res.data = users;
    next();
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({success: false, data: 'Server error'});
  });
}

module.exports = {
  get: get,
  add: add,
  list: list
};
