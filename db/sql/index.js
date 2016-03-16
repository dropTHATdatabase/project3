'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file){
  var filename = path.join(__dirname, file);

  return new QueryFile(filename);
}


module.exports = {
  users: {
    create: sql('users/create.sql')
  }
};
