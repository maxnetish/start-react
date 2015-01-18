var React = require('react'),
    Article = require('./article.jsx');

var ArticlesList = React.createClass({
    render: function () {
        var articleNodes = [],
            ind, indLen, currentArticle;

        for (ind = 0, indLen = this.props.articles.length; ind < indLen; ind++) {
            currentArticle = this.props.articles[ind];
            articleNodes.push(<Article title={currentArticle.title} content={currentArticle.content} key={currentArticle.key} articleKey={currentArticle.key} removeArticle={this.props.removeArticle}/>);
        }

        return <div>
            Artiles list here: {this.props.articles && this.props.articles.length}
        {articleNodes}
        </div>;
    }
});

module.exports = ArticlesList;