const pool = require('../client/index');
const inquirer = require('inquirer');

// Select Roles
const selectRoles = (init) => {
    pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id', function (err, { rows }) {
        console.table(rows);
        init();
    });
};

// Add a Role
const addRole = (init) => {
    pool.query('SELECT name FROM department', function (err, { rows }) {
        console.log(rows);
        inquirer
        .prompt(
            [
                {
                    type: "input",
                    message: "What is the new job title?",
                    name: "jobTitle",
                },
                {
                    type: "list",
                    message: "Which department?",
                    name: "department",
                    choices: rows,
                },
                {
                    type: "input",
                    message: "What is the Salary?",
                    name: "salary",
                },
            ]
            )
            .then(response => {
                pool.query('SELECT id FROM department WHERE name = $1', [response.department], function (err, { rows }) {
                    // console.log(rows[0].id);
                    pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [response.jobTitle, response.salary, rows[0].id], function (err, { rows }) {
                        console.log('Success');
                        init();
                    })
                })
            })
        });
};

module.exports = {selectRoles, addRole};