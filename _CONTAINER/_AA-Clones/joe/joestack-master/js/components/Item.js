var React = require('react');
var TodoText = require('./TodoText');
var TodoCheck = require('./TodoCheck');

module.exports = React.createClass({
    render() {
        return (
            <div>
                <TodoText text={this.props.item.text} />
                <TodoCheck item={this.props.item} />
            </div>
        );
    }
});