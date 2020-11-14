// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// establish PORT connection
var connection = mysql.createConnection({
  host: "localhost",

  // port
  PORT: 8080,

  // username
  user: "root",

  // password
  password: "password",

  // name of the db to access
  database: "e_manage_db"
});

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

      name: "startAppOptions",
      type: "list",
      message: "what do you like to do?",
      choices: [
        "View All Employees",
        "View Employees by Department",
        "View Employees by Manager",
        "Add an Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "Quit"
      ]
    })
    .then(function (answer) {

      // direct with function call based on user answer
      switch (answer.startAppOptions) {

        case "View All Employees" || "View Employees by Department" || "View Employees by Manager":
          viewEmployee(answer.startAppOptions);
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role" || "Update Employee Manager":
          updateEmployee(answer.startAppOptions);
          break;

        default:
          endConnection();
      };

    });
};


// function to read data
function viewEmployee(userSelctedOption) {
  // read data with SELECT and different parameters

  switch (userSelctedOption){
    
    case "View Employees by Department":
      viewByDpt();
      break;

    case "View Employees by Manager":
      viewByManager();
      break;

    default:
      viewAll()
  }

  // call startApp()
};

// function to add data
function addEmployee() {
  // collect : first name, last name, role, manager
  // add to database
  // call startApp
};

// function to delete data
function removeEmployee() {
  // provide options of person to delete
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please insert the first name of the employee?"
      },
      {
        name: "last_name",
        type: "input",
        message: "Please insert the last name of the employee"
      }
    ])
    .then(function (answer) {

      connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?", [`{answer.first_name}`, `{answer.last_name}`]),
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee removed!\n");
        }
      // call startApp()
      startApp()
    });
};

// function to update data
function updateEmployee() {

  // options to update data
  // options to set data
  // call startApp
}

// quit
function endConnection() {

  // terminate connection connection.end()
  connection.end()
};

