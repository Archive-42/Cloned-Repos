var Dispatcher = require('../dispatcher');
var $ = require('jquery');

var actions = {

    getTodos() {

        Dispatcher.dispatch({
            name: 'TODOS_LOADING'
        });

        $.ajax({
            method: 'GET',
            url: '/todos',
            success(response) {
                setTimeout(function () {
                    Dispatcher.dispatch({
                        name: 'NEW_TODOS',
                        items: response
                    });
                }, 3000);
            }
        });

    },

    completeTask(task) {

        Dispatcher.dispatch({
            name: 'TASK_COMPLETED',
            task: task
        });

    },

    uncompleteTask(task) {

        Dispatcher.dispatch({
            name: 'TASK_UNCOMPLETE',
            task: task
        });

    }

};

module.exports = actions;