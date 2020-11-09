// dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// establish PORT connection
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    PORT: 8080,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "e-manage_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    runApp();
  });

  // function runApp to start

