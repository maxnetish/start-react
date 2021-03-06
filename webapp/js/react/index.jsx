var React = require('react'),
    ArticlesList = require('./articles-list.jsx');

var root, resources;

var Hello = React.createClass({
    getInitialState: function () {
        return {
            articles: resources.articles,
            numberToAdd: 50,
            renderTime: 0,
            requestTime: 0
        };
    },
    render: function () {
        return <div>
            <p>
                <a href="http://facebook.github.io/react" target="_blank">reactjs</a>
            &nbsp;lib works here</p>
            <button type="button" onClick={this.addLipsum}>Add elements</button>
            <input type="text" value={this.state.numberToAdd} onChange={this.onNumberChange} />
            <button type="button" onClick={this.clearArticles}>Clear list</button>
            <p>Render time:&nbsp;
                <b className="label">{this.state.renderTime}</b>
            &nbsp;ms, request time:&nbsp;
                <b className="label">{this.state.requestTime}</b>
            &nbsp;ms</p>
            <ArticlesList articles={this.state.articles} removeArticle={this.removeArticle}/>
        </div>;
    },
    addLipsum: function () {
        var self = this,
            t0 = Date.now();
        resources.promiseAddArticles({num: this.state.numberToAdd || 50})
            .then(function (res) {
                var t1 = Date.now(), t2;
                self.setState({
                    requestTime: t1 - t0
                });
                self.setState({
                    articles: resources.articles
                });
                setTimeout(function () {
                    t2 = Date.now();
                    self.setState({
                        renderTime: t2 - t1
                    });
                }, 0);
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