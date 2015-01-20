var run = function(resources){
    var angularNs = window.angular;

    require('./list-app').register(angularNs, resources);
};

module.exports = {
    run: run
};