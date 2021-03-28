var React = require('react');
var TodoActions = require('../actions/TodoActions');

module.exports = React.createClass({
    changeTaskCompletion() {
        if (!this.props.item.completed) {
            TodoActions.completeTask(this.props.item);
        } else {
            TodoActions.uncompleteTask(this.props.item);
        }
    },
    itemIsCompleted() {
        return this.props.item.completed;
    },
    render() {
        return (
            <div>
                <input type="checkbox" checked={this.itemIsCompleted()} onChange={this.changeTaskCompletion} />
            </div>
        );
    }
});