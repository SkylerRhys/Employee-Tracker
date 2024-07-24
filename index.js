const {programResponse} = require('./routes/index');
const inquirer = require('inquirer');
const {choices} = require('./utils/index.js');

const question = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "userChoice",
        choices: choices,
    }
];

const init = () => {
    inquirer
    .prompt(
        question
    )
    .then(response => {
        programResponse(response.userChoice, init);
    })
};

init();
