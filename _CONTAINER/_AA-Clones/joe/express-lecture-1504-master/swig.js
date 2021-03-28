var swig = require('swig');

var fs = require('fs');

var data = {
    pagename: 'awesome people',
    authors: ['Paul', 'Jim', 'Jane']
};

fs.readFile('./temp.html', function (err, contents) {
    var template = contents.toString();
    console.log(swig.render(template, { locals: data }));
});