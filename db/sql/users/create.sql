CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY UNIQUE,
  username VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255) NOT NULL,
  hunts_entered INT NOT NULL DEFAULT 0,
  hunts_completed INT NOT NULL DEFAULT 0,
  hunts_won INT NOT NULL DEFAULT 0
);
