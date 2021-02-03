angular.module('app')

.controller(
    'messengerCtrl',
    [
        '$rootScope',
        '$scope',
        '$timeout',
        'socket',
        function($rootScope, $scope, $timeout, socket) {
            "use strict";

            $rootScope.app = {
                title: "Messenger",
                messages: [
                    //{
                    //    id: 1417409398091,        <-- example message object
                    //    user: "John Doe",
                    //    color: '#22A7F0',
                    //    msg: "Hello World!"
                    //}
                ],
                messageClass: function(username) {
                    if(username === $scope.user.username) return "my-message";
                    else return "their-message";
                },
                messageStyle: function(type, username, color) {
                    if(type == 0 && username === $scope.user.username) return {};
                    else if(type == 1 && username === $scope.user.username) return {background: color};
                    else return {background: color};
                },
                getDate: function(unixTimestamp) {
                    return new Date(unixTimestamp).toLocaleString();
                },
                usernameExistsPopoverOpen: false
            };

            $scope.user = {
                registered: false,
                username: "",
                color: "",
                message: ""
            };

            var newID = function() {
                    return new Date().getTime(); // Returns the number of milliseconds since midnight Jan 1, 1970; unix timestamp
                },
                viewportBody = document.getElementById('viewport-body'),
                newMsg;


            $scope.register = function() {
                if($scope.user.username) {
                    socket.emit('new user', {name: $scope.user.username, time: newID()});
                }
            };

            socket.on('new user reply', function(packet) {
                if(packet.success) {
                    $scope.user.registered = true;
                    $scope.user.color = packet.color;
                    $rootScope.app.messages = packet.messages;
                }
                else {
                    $('#username-exists-popover').popover('show');
                    $rootScope.app.usernameExistsPopoverOpen = true;
                }
            });

            $scope.$watch(function(){return $scope.user.username;}, function() {
                if($rootScope.app.usernameExistsPopoverOpen) {
                    $('#username-exists-popover').popover('hide');
                    $rootScope.app.usernameExistsPopoverOpen = false;
                }
            });




            $scope.send = function() {
                if($scope.user.message == 'get users;') {
                    socket.emit('get users');
                    $scope.user.message = "";
                }
                else if($scope.user.message) {
                    newMsg = {
                        id: newID(),
                        user: $scope.user.username,
                        color: $scope.user.color,
                        msg: $scope.user.message
                    };
                    $rootScope.app.messages.push(newMsg);
                    socket.emit('message', newMsg);
                    $timeout(function(){
                        viewportBody.scrollTop = viewportBody.scrollHeight;
                    },10);
                    $scope.user.message = "";
                }
            };

            socket.on('new message', function(message) {
                $rootScope.app.messages.push(message);
                $timeout(function(){
                    viewportBody.scrollTop = viewportBody.scrollHeight;
                },10);
            });




            socket.on('get users reply', function(users) {
                $rootScope.app.messages.push({id: newID(), user: '$erver', color: 'linear-gradient(180deg, rgba(44,62,80,0.75), #22313F)',
                    msg: 'users: ' + JSON.stringify(users, null, 4)});
                $timeout(function(){
                    viewportBody.scrollTop = viewportBody.scrollHeight;
                },10);
            });
        }
    ]
);