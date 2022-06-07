module.exports = function(io, api) {
    "use strict";
    var success;

    io.on('connection', function(socket) {

        socket.on('new user', function(user) {
            success = api.user.add(user);
            socket.emit('new user reply', {success: success, color: api.user.color(success), messages: api.messages.get()});
        });

        socket.on('delete user', function(user) {
            socket.emit('delete user reply', api.user.deleteUsr(user));
        });

        socket.on('get users', function() {
            socket.emit('get users reply', api.user.get());
        });

        socket.on('message', function(message) {
            api.messages.add(message);
            socket.broadcast.emit('new message', message);
        });

    });
};