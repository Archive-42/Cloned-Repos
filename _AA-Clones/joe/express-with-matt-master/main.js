var http = require('http');
var server = http.createServer();
var express = require('express');

var pipeline = express();

// bodyParser.json
pipeline.use(function (req, res, next) {

    req.body = {};

    if (req.method !== 'PUT' && req.method !== 'POST') {
        next();
        return;
    }

    req.body = JSON.parse(req.jsonString); // '{"name": "Matt"}'

    next();

});

// pipeline.get('/', function (req, res) {
//     res.send('Test');
// });
// //THESE TWO ARE THE SAME ^
// pipeline.use(function (req, res, next) {
//     if (req.method === 'GET' && req.url === '/') {
//         res.send('Test');
//     } else {
//         next();
//     }
// });

pipeline.get('/', function(req, res, next){
   res.send(["notFoo", "notBar", "notBaz"]);    //send is a more robust version of end (in node) and thus, can handle arrays
    next();
});     //default input of browser is GET request, check out network tab in console, shows request method

// []
// .get ->> [fn]
// .use ->> [fn, fn]

server.on("request", function(req, res){
    // console.log(req.url);
    // if(req.url === "/products"){
    //     res.end("This is the products page");
    // } else {
    //     res.end("This is every other page");
    // }
    pipeline(req, res);         // less input/output, more message describing input and tool to implement output
});

server.listen(3000, function(){
    console.log("Server listening!");
});