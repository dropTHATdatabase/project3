SELECT user_id, username, hunts_entered, hunts_completed, hunts_won
FROM users
WHERE username = ${username} AND
password_digest = ${password_digest};
