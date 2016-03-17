'use strict';

const bcrypt = require('bcrypt');


function getHashedPassword(password){
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
}

function comparePassword(password, password_digest){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, password_digest, (err, result) => {
      if(err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  getHashedPassword: getHashedPassword,
  comparePassword: comparePassword
};
