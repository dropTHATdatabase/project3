INSERT INTO clues_users (user_id, clue_id)
VALUES (${user_id}, ${clue_id})
RETURNING *;
