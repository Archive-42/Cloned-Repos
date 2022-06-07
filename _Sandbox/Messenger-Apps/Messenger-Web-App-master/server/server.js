var express = require('express'),
    app = module.exports = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    portNum = 3000;

app.configure(function() {
    "use strict";

    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/../www'));
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

require('./socket')(io, require('./api')());

server.listen(portNum, function() {
   "use strict";

    console.log("Express server listening on port %d in %s mode.",
        this.address().port, app.settings.env);
});