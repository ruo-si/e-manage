const mysql = require("mysql");

// establish PORT connection
const connection = mysql.createConnection({
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

  module.exports = connection;