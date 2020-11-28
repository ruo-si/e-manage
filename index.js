// dependencies
// var mysql = require("mysql");
var inquirer = require("inquirer");
const connection = require("./model/connection")

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
      message: "what do you like to do?",
      choices: [
        "View All Employees",
        "View Employees by Department",
        "View Employees by Role",
        "Add an Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Remove Employee",
        "Quit"
      ]
    })
    .then(function (answer) {

      // direct with function call based on user answer
      switch (answer.userChoice) {

        case "View all Employees":
          viewAll()
          break;

        case "View By Departments":
          viewByDepartments()
          break;

        case "View By Roles":
          viewByRole()
          break;

        case "Add an Employee":
          addEmployee()
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

  connection.query("SELECT * FROM employee", function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();
  })

};

// function to read data print by department
function viewByDepartments() {
  // display message
  console.log("Fetching all departments data ... \n");

  connection.query("SELECT * FROM department", function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();
  })

};

// function to read data print by role
function viewByRole() {

  // display message
  console.log("Fetching all role data ... \n");

  connection.query("SELECT * FROM role", function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();
  })

};

// function to add data
function addEmployee() {


  // prompt and collect : first name, last name, role, manager
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please Insert first name of employee?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Please insert last name of employee?"
      },
      {
        name: "roleId",
        type: "number",
        message: "Please provide roleID of new employee \n 1. Sales Lead \n 2. Lead Engineer \n 3. Legal Team Lead \n 4. Accountant \n 5. Salesperson \n 6. Software Engineer \n 7. Lawyer",
        // validate
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("please enter a number as ID!")
          return false;
        }
      },
      {
        name: "managerId",
        type: "number",
        message: "Please insert the manager id of new employee?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log("please enter a number as ID!")
          return false;
        }
      }
    ])
    .then(function (answer) {

      // display message
      console.log("Inserting employee data ... \n");

      // add to database
      connection.query(

        "INSERT INTO employee (first_name, last_name, role_id, manager_id) SET (?, ?, ?, ?)",
        [
          answer.firstName,
          answer.lastName,
          answer.roleId,
          answer.managerId || NULL
        ],
        function (err) {
          if (err)
            throw err;
          console.log(answer.first_name + " was succssfully logged into the system!")

          // call startApp
          startApp();
        }
      );
    });

};

// function to delete data
function removeEmployee() {

  // provide options of person to delete
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please insert the first name of the employee?"
        // validate
      },
      {
        name: "lastName",
        type: "input",
        message: "Please insert the last name of the employee"
        // validate
      }
    ])
    .then(function (answer) {

      // display message
      console.log("Deleting employee data ... \n");

      connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",
        [
          answer.firstName,
          answer.lastName
        ],
        function (err, res) {
          if (err) throw err;

          console.log(res.affectedRows + " employee removed!\n");

          // call startApp()
          startApp();
        }
      );
    });
};

// function to update data
function updateEmployeeRole() {

  // options to update data
  // options to set data

  // display message
  console.log("Updating employee data ... \n");

  // call startApp
  startApp();
};

// quit
function endConnection() {

  // display message
  console.log("Program exiting ... \n");

  // terminate connection connection.end()
  connection.end()
};

