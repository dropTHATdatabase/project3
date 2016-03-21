DELETE FROM hunts
WHERE hunt_id = ${hunt_id}
AND owner_id = ${user_id};
