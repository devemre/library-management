CREATE DATABASE library_schema;
USE library_schema;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE borrows (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  book_id INT,
  score INT,
  is_returned BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Example initial data from given Postman collection
INSERT INTO users (name) VALUES ("Eray Aslan"), ("Enes Faruk Meniz"), ("Sefa Eren Şahin"), ("Kadir Mutlu");
INSERT INTO books (name) VALUES ("The Hitchhiker's Guide to the Galaxy"), ("I, Robot"), ("Dune"), ("1984"), ("Brave New World");

