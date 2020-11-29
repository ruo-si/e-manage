
// function to read data & print all employees
function viewAll() {

    // display message
    console.log("Fetching all employee data ... \n");

    connection.query("SELECT exployee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id=role.id", function (err, res) {

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
    console.log(answer)

    let query = "SELECT first_name, last_name, title, salary FROM employee INNER JOIN role ON employee.role_id=role.id"

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

    connection.query("SELECT * FROM role", function (err, res) {

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

                // check input = number
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

                // check input = number
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

// function to add department data
function addDepartment() {


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

                // check input = number
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

                // check input = number
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
            console.log("Inserting department ... \n");

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

          // function to add data
  function addRole() {
  
  
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
          
          // check input = number
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
          
          // check input = number
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
        console.log("Inserting role ... \n");
  
        // add to database
        connection.query(
  
          "INSERT INTO Role(first_name, last_name, role_id, manager_id) SET (?, ?, ?, ?)",
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

// function to update data
function updateEmployeeManager() {

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

// function to remove department
function removeDepartment() {

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

// function to remove role
function removeRole() {

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

// quit
function endConnection() {

    // display message
    console.log("Program exiting ... \n");

    // terminate connection connection.end()
    connection.end()
};

