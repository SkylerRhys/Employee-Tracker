const pool = require('../client/index');

// Select Departments
const selectDepartments = () => {
    pool.query('SELECT * FROM department', function (err, { rows }) {
        console.table(rows);
    });
};

// Select Roles
const selectRoles = () => {
    pool.query('SELECT * FROM role', function (err, { rows }) {
        console.table(rows);
    });
};

module.exports = {
    selectDepartments,
    selectRoles
};