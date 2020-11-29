// dependencies 
const inquirer = require("inquirer");
const connection = require("./db/connection")
require("console.table");

// connection
connection.connect(function (err) {

    if (err) throw err;

    // call the runApp function after the connection is established
    launch();
});

// app start
function launch() {
    // ask what the user would like to do:
    inquirer
        .prompt({
            name: "launchChoice",
            type: "list",
            message: "What would you like to do? \n",
            choices: [
                "View",
                "Add",
                "Update",
                "Remove",
                "Exit"
            ]
        })
        .then(function (answer) {

            // direct with function call based on user answer
            switch (answer.launchChoice) {

                // view (department, role, employee)
                case "View":
                    view()
                    break;

                // add (department, role, employee)
                case "Add":
                    add()
                    break;

                // update (department, role, employee)
                case "Update":
                    update()
                    break;

                // remove (department, role, employee)
                case "Remove":
                    remove();
                    break;

                // exit
                default:
                    endConnection();
                    break;
            };

        });
};




// function Add
    // ask which table (department, role, employee)

    // connection.query (INSERT INTO)


// function view
    // ask which table 

    // connection.query SELECT)


// function update
    // ask which 

    // connection.query (UPDATE...SET)


// function remove
    // ask which 

    // connection.query (DELETE)


// function exit




