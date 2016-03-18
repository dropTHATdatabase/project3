SELECT username, users.user_id AS participant_id,
SUM(case when clusers.completed then 1 else 0 end) AS progress
FROM users
LEFT JOIN clues_users AS clusers
ON clusers.user_id = users.user_id
WHERE users.user_id IN ($1^)
GROUP BY username, participant_id;
