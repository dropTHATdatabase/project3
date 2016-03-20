'use strict';

const path = require('path');
const sql = require(path.join(__dirname, '../sql'));

module.exports = function(db) {
  return {
    create: function(){
      return db.none(sql.participants.create);
    },
    add: function(values){
      return db.one(sql.participants.add, values);
    },
    get: function(hunt_id){
      return db.any(sql.participants.get, hunt_id);
    }
  };
};
