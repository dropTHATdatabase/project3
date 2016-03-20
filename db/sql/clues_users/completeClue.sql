UPDATE clues_users SET completed = true
WHERE clue_id = ${clue_id} AND user_id = ${user_id};
