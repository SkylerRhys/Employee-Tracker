const {selectDepartments, addDepartment} = require('./departments.js');
const {selectRoles, addRole} = require('./roles.js');
const {selectEmployees, addEmployee, updateEmployee} = require('./employees.js');

const programResponse = (choice, init) => {
    if (choice === "View all departments") {
        selectDepartments(init);
    } else if (choice === "View all roles") {
        selectRoles(init);
    } else if (choice === "View all employees") {
        selectEmployees(init);
    } else if (choice === "Add a department") {
        addDepartment(init);
    } else if (choice === "Add a role") {
        addRole(init);
    } else if (choice === "Add an employee") {
        addEmployee(init);
    } else if (choice === "Update an employee role") {
        updateEmployee(init);
    } else {
        console.log("Goodbye, feel free to close the terminal");
    }
};

module.exports = {
    programResponse,
};