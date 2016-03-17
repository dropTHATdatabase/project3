CREATE TABLE IF NOT EXISTS clues (
  clue_id SERIAL PRIMARY KEY UNIQUE,
  hunt_id INT,
  clue_number INT,
  description TEXT,
  lat NUMERIC,
  lng NUMERIC
);

CREATE INDEX ON clues (hunt_id);
