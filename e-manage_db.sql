DROP DATABASE IF EXISTS e_manage_db;

CREATE DATABASE e_manage_db;

USE e_manage_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id VARCHAR(30),
  manager_id INTEGER DEFAULT NULL,
  PRIMARY KEY (id)
);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;