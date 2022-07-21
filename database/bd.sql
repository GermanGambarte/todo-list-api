-- Active: 1658349371904@@localhost@3306@todo_api
-- table user
CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(45) NOT NULL, 
  password VARCHAR(100) NOT NULL
);

-- table user
CREATE TABLE tasks (
  id BINARY(16) PRIMARY KEY,
  content TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT 0, 
  id_user BINARY(16) NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users(id)
);