-- all seeds for tables: department, role and employee

-- department --
-- 1. 
INSERT INTO department (name)
VALUE ("Sales");

-- 2. 
INSERT INTO department (name)
VALUE ("Engineering");

-- 3.
INSERT INTO department (name)
VALUE ("Finance");

-- 4.
INSERT INTO department (name)
VALUE ("Legal");


-- role --
-- 1. 
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 150000, 1);

-- 2.
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 180000, 2);

-- 3.
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 150000, 4);

-- 4.
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);

-- 5.
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 90000, 1);

-- 6.
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 95000, 2);

-- 7.
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 195000, 4);



-- employee -- 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Walter", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Rick", "Penn", 5, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sally", "Brooks", 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Billy", "Lee", 5, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Kevin","Cho", 4, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Andrew", "Kim", 3, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Sarah", "Anderson", 7, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Jim", "Brown", 2, 6);

