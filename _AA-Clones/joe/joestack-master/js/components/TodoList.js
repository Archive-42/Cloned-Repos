var React = require('react');
var TodoItems = require('./TodoItems');
var Stats = require('./Stats');

module.exports = React.createClass({
    render() {
        return (
            <div>
                <Stats />
                <TodoItems />
            </div>
        );
    }
});