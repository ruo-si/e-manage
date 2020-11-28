// dependencies
var inquirer = require("inquirer");
// const Choices = require("inquirer/lib/objects/choices");
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

        case "View All Employees":
          viewAll()
          break;

        case "View Employees by Department":
          viewByDepartments()
          break;

        case "View Employees by Role":
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

  connection.query("SELECT first_name, last_name, title, salary FROM employee INNER JOIN role ON employee.role_id=role.id", function (err, res) {

    // print table in console
    console.table(res);

    // call startApp()
    startApp();
  })

};

// function to read data print by department
function viewByDepartments() {

  // ask what the user would like to do:
  inquirer
    // prompt options
    .prompt({

      name: "deptChoice",
      type: "list",
      message: "Which department would you like to view?",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal",
      ]
    })
    .then(function (answer) {

      // direct department to view
      switch (answer.deptChoice) {

        case "Sales":
          pullDeptData(1)
          break;

        case "Engineering":
          pullDeptData(2)
          break;

        case "Finance":
          pullDeptData(3)
          break;

        case "Legal":
          pullDeptData(4)
          break;

        default:
          viewAll();
          break;
      };
    });

  function pullDeptData(roleId) {
    // display message
    console.log("Fetching employee by department data ... \n");

    connection.query("SELECT * FROM department", function (err, res) {

      // print table in console
      console.table(res);

      // call startApp()
      startApp();
    })
  };

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
        message: "Please provide roleID of new employee \n 1. Sales Lead \n 2. Lead Engineer \n 3. Legal Team Lead \n 4. Accountant \n 5. Salesperson \n 6. Software Engineer \n 7. Lawyer \n",
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

            // print out each available name in employee table
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
              choiceArray.push(`${res[i].first_name} ${res[i].last_name}`);
            }
            return choiceArray;
          },
          message: "Which employee would you like to remove from the system?"
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

        // delete from database
        connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",
          [
            firstName,
            lastName
          ],
          function (err, res) {
            if (err) throw err;

            console.log(`${firstName} ${lastName} was successfully removed from the system!\n`);

            // call startApp()
            startApp();
          }
        );
      });
  })
};

// function to update data
function updateEmployeeRole() {

  // provide options of person update data
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
      },
      {
        name: "updateInfo",
        type: "list",
        message: "Which information would you like to update?",
        choices: [
          "First Name", "Last Name", "Department", "Role", "Salary", "Manager"
        ],

      }
    ])
    .then(function (answer) {
      // options to update data


      // display message
      console.log("Updating employee data ... \n")

      connection.query(

        "UPDATE ? SET ? WHERE ?",
        [

          answer.updateInfo

        ],
        function (err, data) {
          if (err) throw err;
          console.log("Employee information updated!\n")
        }
      );
    });

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

