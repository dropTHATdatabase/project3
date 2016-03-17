'use strict';

const path = require('path');
const db = require(path.join(__dirname, '../index'));

// Insert clues into database and returns a promise
// Takes an array of clue objects e.g. [{hunt_id:1, clue_number:1,
// description:"something", lat:25.2334 , lon:-80.342323}, ...]
// returns array of clue objects
function insertClues(hunt_id, clues){
  // db.tx executes a transaction
  // i.e. Do not change db until all queries are done
  return db.tx(function(t){
    // Create a set of queries to execute and push
    // to an array
    var queries = [];
    var q;
    for(var i = 0; i < clues.length; i++){
      clues[i].hunt_id = hunt_id;
      q = this.clues.add(clues[i]); // Add clue i to db
      queries.push(q);
    }
    // Runs all querues asynchronously
    return this.batch(queries);
  });
}

// Inserts participants into the database and
// returns a promise with an array of perticipan objects
// expects a hunt_id and array of participant_ids
function insertParticipants(hunt_id, participant_ids){
    return db.tx(function(t){
      var queries = [];
      var q;
      for(var i = 0; i < participant_ids.length; i++){
        q = this.participants.add({
          hunt_id: hunt_id,
          participant_id: participant_ids[i]});

        queries.push(q);
      }

      return this.batch(queries);
    });
  }

// Inserts a cross reference between each participant
// in a hunt and each clue in a hunt
// Expects an array of user_ids and clue_ids
// Returns a promise with an array of clues_users objects
function insertCluesUsers(user_ids, clue_ids){
  return db.tx(function(t){
    var queries =[];
    var q;
    for(var i = 0; i < user_ids.length; i++){
      for(var j = 0; j < clue_ids.length; j++){
        q = this.clues_users.add({
          user_id: user_ids[i],
          clue_id: clue_ids[j]
        });

        queries.push(q);
      }
    }

    return this.batch(queries);
  });
}

// Takes a hunt object of the form
// {
// owner_id: "Harry",
// wager: "Loser buys a beer",
// deadline: "2016-12-17 07:37:16-08",
// participants: [1, 2, 3],
// clues: [
//   {
//     clue_number: 1,
//     description: 'Where General Assembly Began',
//     lat: 25.0876534,
//     lng: -80.234214
//   },
//   {
//     clue_number: 2,
//     description: 'Where General Assembly Began',
//     lat: 25.1276534,
//     lng: -80.344214
//   }
// ]
// };
// Returns a hunt object with ids
function insertHunt(hunt) {
  var result = {};
  return new Promise((resolve, reject) => {
    db.hunts.add({
      wager: hunt.wager,
      deadline: hunt.deadline,
      owner_id: hunt.owner_id
    })
    .then((data) => {
      result = data;
      insertClues(hunt.hunt_id, hunt.clues)
      .then((clues) => {
        result.clues = clues;
        insertParticipants(result.hunt_id, hunt.participants)
        .then((participants) => {
          result.participants = participants;
          var clue_ids = result.clues.map(el => el.clue_id);
          insertCluesUsers(hunt.participants, clue_ids)
          .then(() => {
            resolve(result);
          })
          .catch(reject);
        }).catch(reject);
      }).catch(reject);
    })
    .catch(reject);
  });
}

module.exports = {
  insertClues: insertClues,
  insertParticipants: insertParticipants,
  insertCluesUsers: insertCluesUsers,
  insertHunt: insertHunt
};
