module.exports = function() {
    "use strict";

    var users = {
//      "John Doe": 1417409398091,   <-- example
        },
        messages = [
            //{
            //    id: 1417409398091,        <-- example message object
            //    user: "John Doe",
            //    msg: "Hello World!"
            //}
        ],
        colors = [ // 0 - 13 items
            '#4183D7',
            '#663399',
            '#26A65B',
            '#EB9532',
            '#EF4836',
            '#22A7F0',
            '#2ECC71',
            '#8E44AD',
            '#2C3E50',
            '#F5AB35',
            '#1E824C',
            '#3A539B',
            '#6C7A89',
            '#1BBC9B'
        ],
        colorIndex = 0,
        api = {};

    api.user = {
        add: function(user) {
//          user = {
//              name: "John Doe",
//              time: 1417409398091
//          }

            if(user.name == '$erver') return false;
            else if(!users[user.name]) users[user.name] = user.time;
            else return false; // false = user already exists

            return true; // true = added user successfully
        },
        color: function(success) {
            if(success) return colors[colorIndex++ % 14];
        },
        get: function() {
            return users;
        },
        deleteUsr: function(user) {
//          user = {
//              name: "John Doe",
//              time: 1417409398091
//          }

            if(users[user.name]) delete users[user.name];
            else return false; // false = could not delete user

            return true; // true = successfully deleted user
        }
    };

    api.messages = {
        add: function(message) {
            messages.push(message);
        },
        get: function() {
            return messages;
        }
    };
    return api;
};