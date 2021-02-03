var path = require('path');
var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var models = require('../models');
var Project = models.Project;
module.exports = app;

app.engine('html', swig.renderFile);
swig.setDefaults({ cache: false });
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../views'));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use(cookieParser());
app.use(session({
    secret: 'Optimus Prime is my real dad'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/portfolio', function (req, res) {
    Project.find({}).exec()
        .then(function (projects) {
            res.render('portfolio', { projects: projects });
        }).then(null, function (err) {
            console.error(err);
        });
});

app.use('/admin', require('./admin'));