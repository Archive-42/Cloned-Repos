var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assessjs2');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

require('./task.model')
// require('./user.model')
// require('./project.model')

/*
this is so you can say later on 
var models = require('../models')

models('Task').find()

etc
*/
module.exports = mongoose.model.bind(mongoose)