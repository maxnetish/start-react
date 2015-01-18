var ko = require('knockout'),
    resources;

var articles = ko.observableArray();
var elementsToAddNumber = ko.observable(50);
var renderTime = ko.observable(0);
var requestTime = ko.observable(0);
var articlesLength = ko.computed({
    read: function () {
        return articles().length;
    },
    pure: true,
    deferEvaluation: true
});
var addElements = function () {
    var t0 = Date.now();
    resources.promiseAddArticles({
        num: parseInt(elementsToAddNumber(), 10) || 50
    }).then(function (res) {
        var t1 = Date.now(), t2;
        requestTime(t1 - t0);
        ko.utils.arrayPushAll(articles, res);
        t2 = Date.now();
        renderTime(t2 - t1);
    }, function (err) {
        console.log(err);
    });
};
var clearList = function () {
    resources.clearArticles();
    articles.removeAll();
};
var removeArticle = function (article) {
    resources.removeArticle(article.key);
    articles.remove(function (item) {
        return item.key === article.key
    });
};

var vm = {
    addElements: addElements,
    elementsToAddNumber: elementsToAddNumber,
    clearList: clearList,
    renderTime: renderTime,
    requestTime: requestTime,
    articlesLength: articlesLength,
    removeArticle: removeArticle,
    articles: articles
};

var run = function (rootNode, appResources) {
    resources = appResources;
    ko.applyBindings(vm, rootNode);
};

module.exports = {
    run: run
};