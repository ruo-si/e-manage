const connection = require("../db/connection");

const view = {

    viewAll:
        async function () {

            try {
                // display message
                console.log("Fetching all employee data ... \n");

                let query = "SELECT employee.id AS employeeID, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee JOIN role ON role_id = role.id JOIN department ON role.department_id = department.id"

                // fetch table data
                await connection.query(query, function (err, res) {

                    // print table in console
                    console.table(res);

                    // call startApp()
                    // startApp();
                })
            }
            catch (err) {
                throw err;
            }
        },

    viewDepartments:
        function () {

            // display message
            console.log("Fetching department data ... \n");

            let query = "SELECT department.id, department.name AS department FROM department"

            // fetch table data
            connection.query(query, function (err, res) {

                // print table in console
                console.table(res);

                // call startApp()
                // startApp();

            });
        },
    viewRoles:
        function () {

            // display message
            console.log("Fetching role data ... \n");

            let query = "SELECT role.id, role.title, department.name AS department FROM role JOIN department ON role.department_id = department.id"

            // fetch table data
            connection.query(query, function (err, res) {

                // print table in console
                console.table(res);

                // call startApp()
                // startApp();
            })
        }
};

module.exports = view;