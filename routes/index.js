var express = require('express');
var router = express.Router();
var lipsum = require('./lipsum.json');
var _ = require('lodash');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'React vs knockout'});
});

router.get('/react', function (req, res) {
    res.render('react', {title: 'React'});
});

router.get('/ko', function (req, res) {
    res.render('ko', {title: 'Ko'});
});

router.get('/lipsum', function (req, res, next) {
    var num = parseInt(req.query.num, 10) || 10,
        lipsumLen = lipsum.length,
        result = [], i, iLen, rndInd;

    for (i = 0, iLen = num; i < iLen; i++) {
        rndInd = _.random(0, lipsumLen - 1);
        result.push({
            key: _.uniqueId('A_'),
            title: 'Article #' + rndInd,
            content: lipsum[rndInd].content
        });
    }

    res.send(result);
});

module.exports = router;
