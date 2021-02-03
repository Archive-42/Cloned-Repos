var Sequelize = require('sequelize');

var databaseConnection = new Sequelize(
    'postgres://127.0.0.1:5432/1607todos'
);

module.exports = databaseConnection;