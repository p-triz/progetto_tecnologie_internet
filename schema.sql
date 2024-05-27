DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Game;
DROP TABLE if EXISTS Matches;

CREATE TABLE User (
  username Varchar(30) PRIMARY key,
  user_password Varchar(30) NOT NULL,
);

CREATE TABLE Game (
  game_id INTEGER PRIMARY KEY,
  game_name Varchar(30) not null,
);

CREATE TABLE Matches(
    match_id INTEGER PRIMARY key autoincrement,
    score INTEGER not null,
    game_id INTEGER not null,
    username Varchar(30) not null,
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (username) REFERENCES User(username),
);