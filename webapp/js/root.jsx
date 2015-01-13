var React = require('react');

var root;

var Hello = React.createClass({
    getInitialState: function () {
        return {
            world: 'World (initial state)',
            count: 0
        };
    },
    render: function () {
        return <div>
            <h4>Hello {this.state.world}</h4>
            <p>react lib here</p>
            <p>Button pressed {this.state.count} times</p>
            <button onClick={this.changeWorld}>Press to change state</button>
        </div>;
    },
    changeWorld: function () {
        var newCount = this.state.count + 1;
        this.setState({
            world: 'World (changed state)',
            count: newCount
        });
    }
});

var init = function (rootNode) {
    root = rootNode;
    React.render(<Hello />, root);
};

module.exports = {
    init: init
};