const inquirer = require('inquirer');
const pool = require('../client/index');

// Select Employees
const selectEmployees = (init) => {
    pool.query('SELECT emp.id, emp.first_name, emp.last_name, role.title AS job_title, department.name AS department, role.salary, man.first_name AS manager_first_name, man.last_name AS manager_last_name FROM employee emp JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id JOIN employee man ON emp.manager_id = man.id', function (err, { rows }) {
        console.table(rows);
        init();
    });
};

// Add an Employee
const addEmployee = (init) => {
    pool.query('SELECT title FROM role', function (err, { rows }) {
        const jobTitle = rows.map(job => job.title);
        pool.query('SELECT first_name, last_name FROM employee', function (err, { rows }) {
            const managers = rows.map(manager => `${manager.first_name} ${manager.last_name}`);
            // console.log(managers);
            inquirer
            .prompt(
                [
                    {
                        type: "input",
                        message: "What is the employee's first name?",
                        name: "firstName",
                    },
                    {
                        type: "input",
                        message: "What is the employee's last name?",
                        name: "lastName",
                    },
                    {
                        type: "list",
                        message: "What is the employee's role?",
                        name: "title",
                        choices: jobTitle,
                    },
                    {
                        type: "list",
                        message: "Who is the employee's manager?",
                        name: "manager",
                        choices: managers,
                    },
                ]
                )
                .then(response => {
                    const managerArray = response.manager.split(' ');
                    // console.log(managerArray);
                    pool.query('SELECT id FROM employee WHERE first_name = $1 AND last_name = $2', managerArray, function (err, { rows }) {
                        const managerId = rows[0].id;
                        pool.query('SELECT id FROM role WHERE title = $1', [response.title], function (err, { rows }) {
                            const roleId = rows[0].id
                            pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [response.firstName, response.lastName, roleId, managerId], function (err, { rows }) {
                                console.log('Success');
                                init();
                            })
                        })
                    })
                })
            });
        });
};

// Update an Employee
const updateEmployee = (init) => {}

module.exports = {selectEmployees, addEmployee, updateEmployee};