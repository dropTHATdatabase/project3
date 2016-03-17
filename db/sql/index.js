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
    list: sql('users/list.sql')
  },
  hunts: {
    create: sql('hunts/create.sql')
  },
  clues: {
    create: sql('clues/create.sql')
  },
  participants: {
    create: sql('participants/create.sql')
  },
  clues_users: {
    create: sql('clues_users/create.sql')
  }
};
