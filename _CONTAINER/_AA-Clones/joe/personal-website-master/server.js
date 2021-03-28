var http = require('http');
var server = http.createServer();

require('./models');

server.listen(1337, function () {
    console.log('Server is listening on port 1337!');
});

server.on('request', require('./app'));