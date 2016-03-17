CREATE TABLE clues_users (
  user_id INT,
  clue_id INT,
  completed BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX ON clues_users(clue_id);
CREATE INDEX ON clues_users(user_id);
