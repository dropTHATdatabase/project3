'use strict';

const path = require('path');
const sql = require(path.join(__dirname, 'sql'));

const repos = {
  users: require(path.join(__dirname, 'repos/users')),
  clues: require(path.join(__dirname, 'repos/clues')),
  hunts: require(path.join(__dirname, 'repos/hunts')),
  participants: require(path.join(__dirname, 'repos/participants')),
  clues_users: require(path.join(__dirname, 'repos/clues_users'))
};

const opts = {
  extend: function(obj){
    obj.users = repos.users(obj);
    obj.clues = repos.clues(obj);
    obj.hunts = repos.hunts(obj);
    obj.participants = repos.participants(obj);
    obj.clues_users = repos.clues_users(obj);
  }
};

const pgp = require('pg-promise')(opts);
const cn = process.env.DATABASE_URL || 'postgres://localhost/project3_dev';
const db = pgp(cn);

module.exports = db;
