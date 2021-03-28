var React = require('react');
var Item = require('./Item');

var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');

module.exports = React.createClass({
    getInitialState() {
        return {
            items: TodoStore.getItems(),
            loading: TodoStore.getLoading()
        }
    },
    componentDidMount() {
        TodoActions.getTodos();
        TodoStore.on('change', () => {
            this.setState({
                items: TodoStore.getItems(),
                loading: TodoStore.getLoading()
            });
        })
    },

    renderItems() {
        if (!this.state.loading) return this.state.items.map(i => <Item item={i} />);
        return <h1>Loading</h1>;
    },
    render() {
        var items = this.renderItems();
        return (
            <div>
                {items}
            </div>
        );
    }
});