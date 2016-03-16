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
    }
  }
};
