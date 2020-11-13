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
    database: "e-manage_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // call the runApp function after the connection is established
    startApp();
  });

// function startApp to start
    
  // ask what the user would like to do:

  // provide options
    // view all employees
    // view by department
    // view by manager
    // add employee
    // remove employee
    // update employee role
    // update exployee manager
    // quit
  
// function to read data
  // read data with SELECT and different parameters
  // call startApp()


// function to add data
  // collect : first name, last name, role, manager
  // add to database
  // call startApp


// function to delete data
  // provide options of person to delete
  // call startApp()


// function to update data
  // options to update data
  // options to set data
  // call startApp
  
// terminate connection connection.end()

