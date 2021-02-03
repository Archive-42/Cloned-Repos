var server = require('http').createServer();
var express = require('express');
var app = express();
var _ = require('lodash');

var todos = [
    {
        id: 1,
        text: 'Finish this application',
        completed: false
    },
    {
        id: 2,
        text: 'Answer Richards question',
        completed: false
    },
    {
        id: 3,
        text: 'Watch Sam get really comfortable',
        completed: true
    }
];

var path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/todos', function (req, res) {
    res.send(todos);
});

app.put('/todo/:id', function (req, res) {
    var id = req.params.id;
    _.find(todos, { id: id }).completed = true;
    res.send();
});


server.on('request', app);

server.listen(1337);