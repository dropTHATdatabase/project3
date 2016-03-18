SELECT h.hunt_id AS hunt_id,
h.owner_id AS owner_id,
h.wager AS wager,
h.deadline AS deadline
--users.user_id AS winner
FROM hunts AS h
LEFT JOIN participants AS p
ON p.hunt_id = h.hunt_id
--LEFT JOIN users
--ON p.participant_id = users.user_id
--AND users.user_id = h.winner_id
WHERE h.owner_id = $1 OR
p.participant_id = $1;
