'use strict';

var mockHunt = {
  hunt_id: 1,
  isOwner: true,
  wager: "Loser buys a beer",
  deadline: "2016-12-17 07:37:16-08",
  participants: [
    {
      participant_id: 2,
      username: "ColinRobot",
      progress: 2
    },
    {
      participant_id: 3,
      username: "PPPetrov",
      progress: 4
    }
  ],
  clues: [
    {
      clue_id: 1,
      clue_number: 1,
      description: 'Where General Assembly Began',
      lat: 25.0876534,
      lng: -80.234214
    },
    {
      clue_id: 2,
      clue_number: 2,
      description: 'Where General Assembly Began',
      lat: 25.1276534,
      lng: -80.344214
    }
  ]
};


function add(req, res, next){
  res.data = mockHunt;
  next();
}

function list(req, res, next){
  res.data = [
    {
      hunt_id: 1,
      owner_id: 1,
      wager: "Loser buys a beer",
      winner: null,
      deadline: "2016-12-17 07:37:16-08"
    },
    {
      hunt_id: 2,
      owner_id: 1,
      wager: "Loser buys a beer",
      winner: null,
      deadline: "2016-05-17 07:37:16-08"
    }
  ];

  next();
}

function get(req, res, next){
  res.data = mockHunt;

  next();
}

function update(req, res, next){
  res.data = mockHunt;

  next();
}

function remove(req, res, next){

  next();
}

module.exports = {
  list: list,
  add: add,
  get: get,
  update: update,
  remove: remove
};
