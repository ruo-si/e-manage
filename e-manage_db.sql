DROP DATABASE IF EXISTS e_manage_db;

CREATE DATABASE e_manage_db;

USE e_manage_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(7.0),
  department_id INT(10),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30),
  role_id INT(10),
  manager_id INT(10) DEFAULT NULL,
  PRIMARY KEY (id)
);


SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee;