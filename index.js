// dependencies
const inquirer = require("inquirer");
const connection = require("./db/connection")
require("console.table");

// start connection
connection.connect(function (err) {
  if (err) throw err;
  // call the runApp function after the connection is established
  startApp();
});

// function startApp to start after successful connection
function startApp() {

  // ask what the user would like to do:
  inquirer
    // prompt options
    .prompt({

      name: "userChoice",
      type: "list",
      message: "What would you like to do? \n",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update Employee Role",
        "Update Employee Manager",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        "Exit"
      ]
    })
    .then(function (answer) {

      // direct with function call based on user answer
      switch (answer.userChoice) {

        case "View All Employees":
          viewAll()
          break;

        case "View All Departments":
          viewDepartments()
          break;

        case "View All Roles":
          viewRoles()
          break;

        case "Add an Employee":
          addEmployee()
          break;

        case "Add a Department":
          addDepartment()
          break;

        case "Add a Role":
          addRole()
          break;

        case "Update Employee Role":
          updateEmployeeRole()
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "Remove Role":
          removeRole();
          break;

        default:
          endConnection();
          break;
      };

    });
};

// function to read data & print all employees
function viewAll() {

  // display message
  console.log("Fetching all employee data ... \n");

  let query = "SELECT employee.id AS employeeID, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee JOIN role ON role_id = role.id JOIN department ON role.department_id = department.id"

  connection.query(query, function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();
  })

};

// function to read data print by department
function viewDepartments() {

  // display message
  console.log("Fetching department data ... \n");

  let query = "SELECT department.id, department.name AS department FROM department name"

  // configure table data
  connection.query(query, function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();

  });

};

// function to read data print by role
function viewRoles() {

  // display message
  console.log("Fetching role data ... \n");

  let query = "SELECT role.id, role.title, department.name AS department FROM role JOIN department ON role.department_id = department.id"

  connection.query(query, function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();
  })

};

// function to add employee
function addEmployee() {

  // prompt and collect : first name, last name, role, manager
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please Insert first name of employee? \n"
      },
      {
        name: "lastName",
        type: "input",
        message: "Please insert last name of employee? \n"
      },
      {
        name: "roleId",
        type: "number",
        message: "Please provide roleID of new employee \n 1. Sales Lead \n 2. Lead Engineer \n 3. Legal Team Lead \n 4. Accountant \n 5. Salesperson \n 6. Software Engineer \n 7. Lawyer \n",

        // check input = number
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("please enter a number as ID! \n")
          return false;
        }
      },
      {
        name: "manager",
        type: "number",
        message: "Please insert the manager id of this new employee? \n",

        // check input = number
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("please enter a number as ID! \n")
          return false;
        }
      }
    ])
    .then(function (answer) {

      // display message
      console.log("Inserting employee data ... \n");

      // add to database
      connection.query(

        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.firstName,
          answer.lastName,
          answer.roleId,
          answer.managerId || NULL
        ],
        function (err) {
          if (err)
            throw err;
          console.log(answer.first_name + " was succssfully logged into the system! \n")

          // call startApp
          startApp();
        }
      );
    });

};

// function to add department data
function addDepartment() {

  // prompt and collect new department name
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Please Insert a new department. \n"
      },
    ])
    .then(function (answer) {

      // display message
      console.log("Inserting new department ... \n");

      let query = "INSERT INTO department (name) VALUE (?)"

      // add to database
      connection.query(query, [answer.newDepartment],
        function (err) {
          if (err)
            throw err;
          console.log("new department was succssfully created in the system! \n")

          // call startApp
          startApp();
        }
      );
    });
};

// function to add data
function addRole() {

  // prompt and collect : first name, last name, role, manager
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "Please insert the new role. \n"
      },
      {
        name: "newSalary",
        type: "number",
        message: "Please enter the salary for this role \n",

        // check input = number
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("please enter a number! \n")
          return false;
        }
      },
      {
        name: "newDeptId",
        type: "number",
        message: "Please enter the department ID. \n",

        // check input = number
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("please enter a number as ID! \n")
          return false;
        }
      },
    ])
    .then(function (answer) {

      // display message
      console.log("Inserting new role ... \n");

      let query = "INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)"

      // add to database
      connection.query(query, [answer.newRole, answer.newSalary, answer.newDeptId],
        function (err) {
          if (err)
            throw err;
          console.log("new role was succssfully created in the system! \n")

          // call startApp
          startApp();
        }
      );
    });

};

// function to update data
function updateEmployeeRole() {

  // get a list of all employees
  connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
    if (err) throw err;

    // provide options of person to delete
    inquirer
      .prompt([
        {
          name: "updateChoice",
          type: "rawlist",
          choices: function () {

            // print out each available name in employee table (change to .map()?)
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            return choiceArray;
          },
          message: "Which employee would you like to update from the system? \n"
        },
        {
          name: "newRole",
          type: "number",
          message: "Please insert the new role id of this new employee. \n",

          // check input = number
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("please enter a number as ID! \n")
            return false;
          }
        }
      ])
      .then(function (answer) {

        // display message
        console.log("Updating role data ... \n");
        console.log(answer)

        // get first and last name from answer
        updateName = answer.updateChoice;
        nameArr = updateName.split(" ");

        firstName = nameArr[0];
        lastName = nameArr[1];

        let query = "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?"

        // delete from database
        connection.query(query,
          [
            answer.newRole,
            firstName,
            lastName
          ],
          function (err, res) {
            if (err) throw err;

            console.log(`${firstName} ${lastName}'s role information was successfully updated in the system! \n`);

            // call startApp()
            startApp();
          }
        );
      });
  })
};

// function to update data
function updateEmployeeManager() {

  // get a list of all employees
  connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
    if (err) throw err;

    // provide options of person to delete
    inquirer
      .prompt([
        {
          name: "updateChoice",
          type: "rawlist",
          choices: function () {

            // print out each available name in employee table (change to .map()?)
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            return choiceArray;
          },
          message: "Which employee would you like to update from the system? \n"
        },
        {
          name: "newManager",
          type: "number",
          message: "Please insert the new manager id of this new employee? \n",

          // check input = number
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("please enter a number as ID! \n")
            return false;
          }
        }
      ])
      .then(function (answer) {

        // display message
        console.log("Updating manager data ... \n");
        console.log(answer)

        // get first and last name from answer
        updateName = answer.updateChoice;
        nameArr = updateName.split(" ");

        firstName = nameArr[0];
        lastName = nameArr[1];

        let query = "UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?"

        // delete from database
        connection.query(query,
          [
            answer.newManager,
            firstName,
            lastName
          ],
          function (err, res) {
            if (err) throw err;

            console.log(`${firstName} ${lastName}'s manager information was successfully updated in the system! \n`);

            // call startApp()
            startApp();
          }
        );
      });
  })

};

// function to remove employee
function removeEmployee() {

  // get a list of all employees
  connection.query("SELECT first_name, last_name FROM employee", function (err, res) {
    if (err) throw err;

    // provide options of person to delete
    inquirer
      .prompt([
        {
          name: "removeChoice",
          type: "rawlist",
          choices: function () {

            // print out each available name in employee table (change to .map()?)
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            return choiceArray;
          },
          message: "Which employee would you like to remove from the system? \n"
        },
      ])
      .then(function (answer) {

        // display message
        console.log("Deleting employee data ... \n");
        console.log(answer)

        // get first and last name from answer
        removeName = answer.removeChoice;
        nameArr = removeName.split(" ");

        firstName = nameArr[0];
        lastName = nameArr[1];

        let query = "DELETE FROM employee WHERE first_name = ? AND last_name = ?"

        // delete from database
        connection.query(query,
          [
            firstName,
            lastName
          ],
          function (err, res) {
            if (err) throw err;

            console.log(`${firstName} ${lastName} was successfully removed from the system! \n`);

            // call startApp()
            startApp();
          }
        );
      });
  })
};

// function to remove department
function removeRole() {

  // get a list of all employees
  connection.query("SELECT title FROM role", function (err, res) {
    if (err) throw err;

    // provide options of person to delete
    inquirer
      .prompt([
        {
          name: "removeRoleChoice",
          type: "rawlist",
          choices: function () {

            // print out each available name in employee table (change to .map()?)
            var choiceRoleArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceRoleArray.push(`${res[i].title}`);
            }
            return choiceRoleArray;
          },
          message: "Which role would you like to remove from the system? \n"
        },
      ])
      .then(function (answer) {

        // display message
        console.log("Removing role data ... \n");

        // get first and last name from answer
        removeRoleName = answer.removeRoleChoice;

        let query = "DELETE FROM role WHERE title = ?"

        // remove from database
        connection.query(query, [answer.removeRoleChoice],
          function (err, res) {
            if (err) throw err;

            console.log(`${removeRoleName} was successfully removed from the system! \n`);

            // call startApp()
            startApp();
          }
        );
      });
  })
};

// function to remove role
function removeDepartment() {

  // get a list of all employees
  connection.query("SELECT name FROM department", function (err, res) {
    if (err) throw err;

    // provide options of person to delete
    inquirer
      .prompt([
        {
          name: "removeDeptChoice",
          type: "rawlist",
          choices: function () {

            // print out each available name in employee table (change to .map()?)
            var choiceDeptArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceDeptArray.push(`${res[i].name}`);
            }
            return choiceDeptArray;
          },
          message: "Which department would you like to remove from the system? \n"
        },
      ])
      .then(function (answer) {

        // display message
        console.log("Removing department data ... \n");

        // get first and last name from answer
        removeDeptName = answer.removeDeptChoice;

        let query = "DELETE FROM department WHERE name = ?"

        // remove from database
        connection.query(query, [answer.removeDeptChoice],
          function (err, res) {
            if (err) throw err;

            console.log(`${removeDeptName} was successfully removed from the system! \n`);

            // call startApp()
            startApp();
          }
        );
      });
  })
};

// quit
function endConnection() {

  // display message
  console.log("Program exiting ... \n");

  // terminate connection connection.end()
  connection.end()
};

