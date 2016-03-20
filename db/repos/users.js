'use strict';

const path = require('path');
const sql = require(path.join(__dirname, '../sql'));
const pgp = require('pg-promise');

module.exports = function(db) {
  return {
    create: function(){
      return db.none(sql.users.create);
    },
    // Expects {username:, password_digest:}
    // Returns: {user_id:, username: }
    get: function(username){
      return db.oneOrNone(sql.users.get, username);
    },
    // Expects {username:, password_digest:}
    // Returns {user_id: , username: }
    add: function(values){
      return db.one(sql.users.add, values);
    },
    // Returns {user_id, username, hunts_entered,
    // hunts_completed, hunts_won}
    list: function(){
      return db.any(sql.users.list);
    },
    findById: function(id) {
      return db.any(sql.users.findById, id);
    },
    listWithProgress: function(ids) {
      return db.any(sql.users.listWithProgress, pgp.as.csv(ids));
    }
  };
};
