var chalk = require('chalk');

var people = require('./people.json');


var validJSON = JSON.stringify(people);

console.log(JSON.parse(validJSON));

var people = {};
people.people = "blah";

module.exports = people;
module.exports.people = people;