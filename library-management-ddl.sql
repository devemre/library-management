CREATE DATABASE library_schema;
USE library_schema;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255),
  year INT,
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
INSERT INTO books (name, author, year) 
VALUES 
  ("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979),
  ("I, Robot", "Isaac Asimov", 1950),
  ("Dune", "Frank Herbert", 1965),
  ("1984", "George Orwell", 1949),
  ("Brave New World", "Aldous Huxley", 1932);
  
INSERT INTO books (name) VALUES ("Test");