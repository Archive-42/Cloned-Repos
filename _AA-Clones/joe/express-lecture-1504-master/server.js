var http = require('http');
var fs = require('fs');

var server = http.createServer();

var joe = {
    name: 'Joe',
    age: 27,
    location: 'New Jersey'
};

server.on('request', function (request, response) {

    if (request.method === 'GET') {

        if (request.url === '/joe') {
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify(joe));
            response.end();
        } else if (request.url === '/puppy') {
            response.write('Yeah I like puppies');
            response.end();
        } else if (request.url === '/') {
            response.setHeader('Content-Type', 'text/html');
            fs.readFile('./home.html', function (err, contents) {
                var htmlString = contents.toString();
                response.write(htmlString);
                response.end();
            });
        } else {
            response.statusCode = 404;
            response.end();
        }

    }

});

server.listen(1337);