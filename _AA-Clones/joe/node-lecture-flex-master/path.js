var path = require('path');
var url = require('url');

var fullstackAcademy = 'https://www.fullstackacademy.com/flex?hello=1&goodbye=2';

console.log(url.parse(fullstackAcademy));

var path1 = __dirname;
var path2 = '../..';

console.log(path1);

console.log(path.join(path1, path2));