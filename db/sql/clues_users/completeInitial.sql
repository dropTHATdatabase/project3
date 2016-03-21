UPDATE clues_users
SET
completed = true
WHERE
clue_id = $1;
