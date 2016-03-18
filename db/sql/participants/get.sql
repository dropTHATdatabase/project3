SELECT p.participant_id AS participant_id, u.username AS username,
  SUM(case when clusers.completed then 1 else 0 end) AS progress
FROM participants AS p
LEFT JOIN users AS u
ON p.participant_id = u.user_id
LEFT JOIN clues_users AS clusers
ON p.participant_id = clusers.user_id
WHERE
p.hunt_id = $1
GROUP BY participant_id, username;
