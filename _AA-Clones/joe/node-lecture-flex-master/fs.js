var fs = require('fs');
var async = require('async');

var files = ['./shapes.js', './Puppy_2.jpg', './square.js'];

var myReadFile = function (filename, completed) {

    fs.readFile(filename, function (err, contents) {
        if (err) {
            completed(err);
        } else {
            setTimeout(function () {
                completed(null, contents);
            }, 3000);

        }

    });

};

async.map(files, myReadFile, function (err, transformedArray) {
    console.log(transformedArray);
});


