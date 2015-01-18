var request = require('superagent'),
    Q = require('q');

var onRequestEnd = function (dfr) {
    return function (err, res) {
        if (err) {
            dfr.reject(err);
            return err;
        }
        if (res.error) {
            dfr.reject(res.error);
            return res.error;
        }
        dfr.resolve(res);
        return res;
    };
};

var subscribes = {
    articlesChanged: []
};

var onArticlesChanged = function (articles) {
    var i, iLen;
    for (i = 0, iLen = subscribes.articlesChanged.length;i<iLen;i++) {
        if (subscribes.articlesChanged[i]) {
            subscribes.articlesChanged[i](articles);
        }
    }
};

var appResources = {
    articles: [],
    promiseAddArticles: function (opts) {
        var dfr = Q.defer(),
            self = this;
        request
            .get('/lipsum')
            .query(opts)
            .end(onRequestEnd(dfr));
        return dfr.promise.then(function (res) {
            var newArticles = res.body;
            Array.prototype.push.apply(self.articles, newArticles);
            onArticlesChanged(self.articles);
            return newArticles;
        });
    },
    clearArticles: function () {
        this.articles.length = 0;
        onArticlesChanged(this.articles);
    },
    removeArticle: function (key) {
        var indexToRemove=null, i, iLen;
        for(i=0,iLen=this.articles.length;i<iLen;i++){
            if(this.articles[i].key === key){
                indexToRemove = i;
                break;
            }
        }

        if(indexToRemove!==null){
            this.articles.splice(indexToRemove, 1);
        }

        onArticlesChanged(this.articles);
    },
    subscribeArticlesChanged: function (cb) {
        subscribes.articlesChanged.push(cb);
    }
};

module.exports = appResources;