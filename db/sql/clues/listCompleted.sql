SELECT clues.* FROM clues
LEFT JOIN clues_users AS clusers
ON clusers.clue_id = clues.clue_id
WHERE clues.hunt_id = ${hunt_id} AND
clusers.user_id = ${user_id} AND
clusers.completed
ORDER BY clues.clue_number;  
