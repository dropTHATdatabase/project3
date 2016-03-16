CREATE TABLE IF NOT EXISTS hunts (
  hunt_id SERIAL PRIMARY KEY UNIQUE,
  owner_id INT NOT NULL,
  deadline TIMESTAMP NOT NULL,
  wager VARCHAR(255) NOT NULL,
  winner_id INT
);

CREATE INDEX ON hunts (owner_id);
