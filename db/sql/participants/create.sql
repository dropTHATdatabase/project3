CREATE TABLE IF NOT EXISTS participants (
  hunt_id INT,
  participant_id INT
);

CREATE INDEX ON participants (participant_id);
CREATE INDEX ON participants (hunt_id);
