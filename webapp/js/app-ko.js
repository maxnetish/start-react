console.log('ko exec');

var
    //$ = require('jquery'),
    resources = require('./resources'),
    koApp = require('./ko');

koApp.run(document.getElementsByClassName('ko-wrapper')[0], resources);
