INSERT INTO hunts(owner_id, deadline, wager) VALUES
(${owner_id}, ${deadline}, ${wager})
RETURNING *;
