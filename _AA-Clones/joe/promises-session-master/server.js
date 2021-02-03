var express = require('express');
var app = express();

var dogsTool = require('./dogs-tool');
var latencyMiddleware = require('./latency-middleware');

app.listen(1336, function () {
    console.log('Listening 1336');
});

app.use(express.static(__dirname));

// /dogs/{breedName}/{fileName}

// /dogs/akita/akita1.jpg

app.use(latencyMiddleware(2000));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/breeds', function (req, res) {
    dogsTool.getBreeds().then(function (breeds) {
        res.send(breeds);
    });
});

app.get('/photos/:breedName', function (req, res) {
    dogsTool.getBreedPhotos(req.params.breedName).then(function (photos) {
        console.log(photos);
        res.send(photos);
    });
});

