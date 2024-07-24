const inquirer = require('inquirer');
const pool = require('../client/index');

// Select Departments
const selectDepartments = (init) => {
    pool.query('SELECT * FROM department', function (err, { rows }) {
        console.table(rows);
        init();
    });
};

// Add a Department
const addDepartment = (init) => {
    inquirer
    .prompt([{
        type: "input",
        message: "What is the name of the department you're adding?",
        name: "newDepartment",
    }])
    .then(response => {
        pool.query('INSERT INTO department (name) VALUES ($1)', [response.newDepartment], function (err, { rows }) {
            console.log('Success');
            init();
        });
    })
}

module.exports = {selectDepartments, addDepartment};