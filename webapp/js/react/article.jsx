var React = require('react');

var Article = React.createClass({
    render: function () {
        return <article className="article">
            <h4 className="article-title">{this.props.title}</h4>
            <p className="article-content">{this.props.content}</p>
        </article>;
    }
});

module.exports = Article;