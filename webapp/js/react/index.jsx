var React = require('react'),
    ArticlesList = require('./articles-list.jsx');

var root;

var Hello = React.createClass({
    getInitialState: function () {
        return {
            world: 'World (initial state)',
            count: 0,
            articles: []
        };
    },
    render: function () {
        return <div>
            <h4>Hello {this.state.world}</h4>
            <p>react lib here</p>
            <p>Button pressed {this.state.count} times</p>
            <button onClick={this.changeWorld}>Press to change state</button>
            <ArticlesList articles={this.state.articles}/>
        </div>;
    },
    changeWorld: function () {
        var newCount = this.state.count + 1;
        this.setState({
            world: 'World (changed state)',
            count: newCount,
            articles: [{
                key: 'AA',
                title: 'First',
                content: 'Content 1'
            }, {
                title: 'Second',
                key: 'AB',
                content: 'content 2'
            }]
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