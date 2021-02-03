var path = require('path');

module.exports = function (config) {

    var filesCollection = [
        'node_modules/angular/angular.js',
        'browser/app.js',
        'browser/main.controller.js',
        'browser/product.directive.js',
        'browser/product.factory.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'tests/**/*.js'
    ];

    var excludeFiles = [
        'tests/karma.conf.js'
    ];

    var configObj = {
        browsers: ['Chrome'],
        frameworks: ['chai', 'mocha'],
        basePath: path.join(__dirname, '../'),
        files: filesCollection,
        exclude: excludeFiles
    };

    config.set(configObj);

};