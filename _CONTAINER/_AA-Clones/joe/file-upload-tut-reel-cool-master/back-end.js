var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload-image', function (req, res) {
    var b64Data = req.body.data.split(',')[1];
    var buffer = new Buffer(b64Data, 'base64');
    fs.writeFile('./' + req.body.name, buffer, function (e) {
        if (e) console.error(e);
    });
});

app.listen(8080, function () {
    console.log('On!');
});