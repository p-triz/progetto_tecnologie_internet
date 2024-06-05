DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Matches;

CREATE TABLE User (
  username VARCHAR(30) PRIMARY KEY,
  user_password VARCHAR(30) NOT NULL
);

CREATE TABLE Game (
  game_id INTEGER PRIMARY KEY,
  game_name VARCHAR(30) NOT NULL,
  game_description VARCHAR(100) NOT NULL
);

CREATE TABLE Matches (
  match_id INTEGER PRIMARY KEY AUTOINCREMENT,
  score INTEGER NOT NULL,
  game_id INTEGER NOT NULL,
  username VARCHAR(30) NOT NULL,
  FOREIGN KEY (game_id) REFERENCES Game(game_id),
  FOREIGN KEY (username) REFERENCES User(username)
);

INSERT INTO Game (game_id, game_name, game_description)
VALUES
    ('1', 'snake','Move your snake and let him eat apples'),
    ('2', 'flappy','Make your bird fly avoiding obstacles');
