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
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Department",
        "View All Roles",
        "View Employees by Manager",
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


