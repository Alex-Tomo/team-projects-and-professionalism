# User_id is FK to users
# Type -> math, english, verablreasoning, nonverbalreasoning

CREATE TABLE IF NOT EXISTS lessons (
    lesson_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    questions_list VARCHAR(64),
    type TEXT
);

CREATE TABLE IF NOT EXISTS users_lessons (
    lesson_id INTEGER,
    user_id INTEGER,
    completed BOOLEAN,
    user_score INTEGER,
    possible_score INTEGER
);




