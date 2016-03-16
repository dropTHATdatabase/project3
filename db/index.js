'use strict';

const path = require('path');
const pgp = require('pg-promise')();
const cn = process.env.DATABASE_URL || 'postgres://localhost/project3_dev';
const db = pgp(cn);
const sql = require(path.join(__dirname, 'sql'));

module.exports = {
  users: {
    create: function(){
      return db.none(sql.users.create);
    },
    // Expects {username:, password_digest:}
    // Returns: {user_id:, username: }
    get: function(values){
      return db.oneOrNone(sql.users.get, values);
    }
  }
};
