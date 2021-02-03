var React = require('react');

module.exports = React.createClass({
    render() {
        return (
            <div>
                <span>{this.props.text}</span>
            </div>
        );
    }
});