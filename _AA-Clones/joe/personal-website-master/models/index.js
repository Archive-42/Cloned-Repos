var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/personal-website');

mongoose.connection.on('error', function (err) {
    console.error(err);
});

module.exports = {
    Project: require('./project')
};