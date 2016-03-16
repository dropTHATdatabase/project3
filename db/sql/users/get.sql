SELECT user_id, username FROM users
WHERE username = ${username} AND
password_digest = ${password_digest};
