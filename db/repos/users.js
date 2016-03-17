'use strict';

const path = require('path');
const sql = require(path.join(__dirname, '../sql'));

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
    }
  };
};
