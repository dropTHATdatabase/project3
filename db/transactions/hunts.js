'use strict';

const path = require('path');
const db = require(path.join(__dirname, '../index'));

// Insert clues into database and returns a promise
// Takes an array of clue objects e.g. [{hunt_id:1, clue_number:1,
// description:"something", lat:25.2334 , lon:-80.342323}, ...]
function insertClues(clues){
  // db.tx executes a transaction
  // i.e. Do not change db until all queries are done
  return db.tx(function(t){
    // Create a set of queries to execute and push
    // to an array
    var queries = [];
    for(var i = 0; i < clues.length; i++){
      var q = this.clues.add(clues[i]); // Add clue i to db
      queries.push(q);
    }
    // Runs all querues asynchronously
    return this.batch(queries);
  });
}

module.exports = {
  insertClues: insertClues
};
