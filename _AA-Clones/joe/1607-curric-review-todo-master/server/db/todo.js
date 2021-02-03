var Sequelize = require('sequelize');
var db = require('./_db');

var Todo = db.define('todo', {
    task: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = Todo;