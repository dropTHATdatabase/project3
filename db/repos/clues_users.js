'use strict';

const path = require('path');
const sql = require(path.join(__dirname, '../sql'));

module.exports = function(db) {
  return {
    create: function(){
      return db.none(sql.clues_users.create);
    },
    // Values: {clue_id:, user_id:}
    add: function(values){
      return db.one(sql.clues_users.add, values);
    },
    // Values = {clue_id:, user_id:}
    completeClue: function(values){
      return db.none(sql.clues_users.completeClue, values);
    }
  };
};
