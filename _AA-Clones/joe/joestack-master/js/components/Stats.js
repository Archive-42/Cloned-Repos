var React = require('react');

var TodoStore = require('../stores/TodoStore');

module.exports = React.createClass({
    getInitialState() {
        return {
            completedItems: TodoStore.getCompletedItems()
        };
    },
    componentDidMount() {
        TodoStore.on('change', () => {
            this.setState({
                completedItems: TodoStore.getCompletedItems()
            });
        });
    },
    render() {
        return (
            <div>
                <h5>Completed Items: {this.state.completedItems}</h5>
            </div>
        );
    }
});