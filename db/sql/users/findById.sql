SELECT user_id, username, hunts_entered,
hunts_completed, hunts_won FROM users
WHERE user_id = $1;
