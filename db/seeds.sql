BEGIN;
INSERT INTO users(username, password_digest)
VALUES
('test1', '$2a$10$v3GTagD0JNq2nwwQzNeXU.HPV8hd5.UTT0.lbb1c8eAaKE0XHHxF2'),
('test2', '$2a$10$v3GTagD0JNq2nwwQzNeXU.HPV8hd5.UTT0.lbb1c8eAaKE0XHHxF2'),
('test3', '$2a$10$v3GTagD0JNq2nwwQzNeXU.HPV8hd5.UTT0.lbb1c8eAaKE0XHHxF2');

INSERT INTO hunts(wager, deadline, owner_id)
VALUES
('Loser buys a beer', '2016-3-19', 1),
('Dinner', '2016-3-28', 1),
('Lunch', '2016-3-24', 2);

INSERT INTO clues(hunt_id, clue_number, description, lat, lng)
VALUES
(1, 0, 'Where GA is', 1, 1),
(1, 1, 'Where harry lives', 2, 2),
(2, 0, 'Where the statue of liberty is', 3,3);

INSERT INTO participants(hunt_id, participant_id)
VALUES
(1, 2),
(1, 3),
(2,1),
(2,3);

INSERT INTO clues_users (user_id, clue_id, completed)
VALUES
(2, 1, true),
(2, 2, false),
(3, 1, true),
(3, 2, true),
(1, 3, true),
(3, 3, false);

COMMIT;
