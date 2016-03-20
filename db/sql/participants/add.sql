INSERT INTO participants (hunt_id, participant_id)
VALUES (${hunt_id}, ${participant_id})
RETURNING *;
