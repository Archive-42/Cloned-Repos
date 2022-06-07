var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var databaseStuff = require('./db');
var db = databaseStuff.db;
var Todo = databaseStuff.Todo;
var pipeline = express();

db.sync()
    .then(function () {
        pipeline.listen(3001, function () {
            console.log('Server is listening on 3001!');
        });
    })
    .catch(console.error);

// 1
pipeline.use(function (req, res, next) {
    console.log('Signal coming in.');
    next();
});

pipeline.use(express.static(path.join(__dirname, '../node_modules')));

// 2
pipeline.use(function (req, res, next) {
    setTimeout(function () {
        next();
    }, Math.random() * 2000);
});

// 3
pipeline.use(bodyParser.urlencoded({extended: false}));
// 4
pipeline.use(bodyParser.json());

// 5
pipeline.get('/todos', function (req, res, next) {

    var gettingAllTodos = Todo.findAll({});

    gettingAllTodos
        .then(function (todos) {
            res.send(todos);
        })
        .catch(next);

});

// 6
pipeline.post('/todos', function (req, res, next) {


    Todo.create(req.body)
        .then(function (createdTodo) {
            res.send(createdTodo);
        })
        .catch(next);


});

// 7
pipeline.put('/todos/:todoId', function (req, res, next) {

    Todo.findById(req.params.todoId)
        .then(function (todoToBeUpdated) {
            return todoToBeUpdated.update({
                completed: req.body.completed
            });
        })
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);


});

pipeline.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../non-server-files/index.html'));
});

// E1
pipeline.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send(err.message);
});
