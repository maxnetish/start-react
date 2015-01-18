/**
 * Created by Gordeev on 13.01.2015.
 */

console.log('app.js exec');

var root = require('./react/index.jsx'),
    resources = require('./resources');

root.init(document.getElementsByClassName('react-wrapper')[0], resources);

