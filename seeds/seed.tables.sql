BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'horatia241',
    'Horatia de Rome',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Latin', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'ante', 'before', 2),
  (2, 1, 'contra', 'against', 3),
  (3, 1, 'quia', 'because', 4),
  (4, 1, 'solus', 'alone', 5),
  (5, 1, 'totus', 'all', 6),
  (6, 1, 'dicere', 'to say', 7),
  (7, 1, 'videre', 'to look', 8),
  (8, 1, 'facere', 'to make', 9),
  (9, 1, 'totus', 'whole', 10),
  (10, 1, 'dies', 'day', 11),
  (11, 1, 'nomen', 'name', 12),
  (12, 1, 'cibus', 'food', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
