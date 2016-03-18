'use strict';

const path = require('path');
const sql = require(path.join(__dirname, '../sql'));

module.exports = function(db) {
  return {
    create: function(){
      return db.none(sql.clues.create);
    },
    add: function(values){
      return db.one(sql.clues.add, values);
    },
    listByHunt: function(hunt_id){
      return db.any(sql.clues.listByHunt, hunt_id);
    }
  };
};
