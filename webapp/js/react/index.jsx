var React = require('react'),
    ArticlesList = require('./articles-list.jsx');

var root, resources;

var Hello = React.createClass({
    getInitialState: function () {
        return {
            world: 'World (initial state)',
            count: 0,
            articles: resources.articles,
            numberToAdd: 50,
            renderTime: 0
        };
    },
    render: function () {
        return <div>
            <h4>Hello {this.state.world}</h4>
            <p>
                <a href="http://facebook.github.io/react" target="_blank">reactjs</a>
            &nbsp;lib works here</p>
            <p>Button pressed {this.state.count} times</p>
            <button type="button" onClick={this.changeWorld}>Press to change state</button>
            <button type="button" onClick={this.addLipsum}>Add elements</button>
            <input type="text" value={this.state.numberToAdd} onChange={this.onNumberChange} />
            <button type="button" onClick={this.clearArticles}>Clear list</button>
            <p>Render time: {this.state.renderTime} ms</p>
            <ArticlesList articles={this.state.articles} removeArticle={this.removeArticle}/>
        </div>;
    },
    changeWorld: function () {
        var newCount = this.state.count + 1;
        this.setState({
            world: 'World (changed state)',
            count: newCount
        });
    },
    addLipsum: function () {
        var self = this;
        resources.promiseAddArticles({num: this.state.numberToAdd || 50})
            .then(function (res) {
                var t1 = Date.now(), t2;
                self.setState({
                    articles: resources.articles
                });
                t2 = Date.now();
                self.setState({
                    renderTime: t2 - t1
                });
            }, function (err) {
                console.log(err);
            });
    },
    clearArticles: function () {
        resources.clearArticles();
        this.setState({
            articles: resources.articles
        });
    },
    onNumberChange: function (e) {
        this.setState({
            numberToAdd: parseInt(e.target.value, 10)
        });
    },
    removeArticle: function (key) {
        resources.removeArticle(key);
        this.setState({
            articles: resources.articles
        })
    }
});

var init = function (rootNode, appResources) {
    root = rootNode;
    resources = appResources;
    React.render(<Hello />, root);
};

module.exports = {
    init: init
};