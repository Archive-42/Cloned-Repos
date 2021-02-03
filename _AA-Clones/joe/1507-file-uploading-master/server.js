var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

server.on('request', app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var fs = require('fs');

app.post('/upload', function (req, res) {
    var base64String = req.body.data.split(',')[1];
    var fileData = new Buffer(base64String, 'base64');
    fs.writeFile('./' + req.body.name, fileData);
});

server.listen(3001);