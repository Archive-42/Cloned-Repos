var TodoModel = require('./todo');
var databaseConnection = require('./_db');

module.exports = {
    Todo: TodoModel,
    db: databaseConnection
};