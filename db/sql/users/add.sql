INSERT INTO users(username, password_digest)
VALUES (${username}, ${password_digest})
RETURNING *;
