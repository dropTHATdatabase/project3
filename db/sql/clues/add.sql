INSERT INTO clues (hunt_id, clue_number,
  description, lat, lng)
VALUES
  (${hunt_id}, ${clue_number}, ${description},
  ${lat}, ${lng})
RETURNING *;
