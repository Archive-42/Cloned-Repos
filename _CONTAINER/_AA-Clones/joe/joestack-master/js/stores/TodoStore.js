var _ = require('lodash');
var Dispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;


var TodoStore = new EventEmitter();

var items = [];
var completedItems = 0;
var loading = false;


TodoStore.getItems = () => items;
TodoStore.getCompletedItems = () => completedItems;
TodoStore.getLoading = () => loading;

TodoStore.dispatcherIndex = Dispatcher.register(function (action) {

    switch (action.name) {

        case 'TASK_COMPLETED':

            let chosenTask = _.find(items, { id: action.task.id });

            if (!chosenTask.completed) {
                chosenTask.completed = true;
                completedItems++;
                TodoStore.emit('change');
            }

            break;


        case 'TASK_UNCOMPLETE':

            let chosenTask = _.find(items, { id: action.task.id });

            if (chosenTask.completed) {
                chosenTask.completed = false;
                completedItems--;
                TodoStore.emit('change');
            }

            break;

        case 'TODOS_LOADING':
            loading = true;
            items = [];
            completedItems = 0;
            TodoStore.emit('change');
            break;

        case 'NEW_TODOS':
            loading = false;
            items = action.items;
            completedItems = items.filter(i => i.completed).length
            TodoStore.emit('change');
            break;

        default:
            break;

    }

});

module.exports = TodoStore;
