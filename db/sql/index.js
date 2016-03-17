'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file){
  var filename = path.join(__dirname, file);

  return new QueryFile(filename);
}


module.exports = {
  users: {
    create: sql('users/create.sql'),
    get: sql('users/get.sql'),
    add: sql('users/add.sql'),
    list: sql('users/list.sql'),
    findById: sql('users/findById.sql')
  },
  hunts: {
    create: sql('hunts/create.sql'),
    add: sql('hunts/add.sql')
  },
  clues: {
    create: sql('clues/create.sql'),
    add: sql('clues/add.sql')
  },
  participants: {
    create: sql('participants/create.sql'),
    add: sql('participants/add.sql')
  },
  clues_users: {
    create: sql('clues_users/create.sql'),
    add: sql('clues_users/add.sql')
  }
};
