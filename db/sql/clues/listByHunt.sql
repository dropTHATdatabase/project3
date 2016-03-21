SELECT * FROM clues
WHERE hunt_id = $1
ORDER BY clue_number;
