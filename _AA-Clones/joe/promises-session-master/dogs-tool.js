var Promise = require('bluebird');
var fs = require('fs');


var readDir = Promise.promisify(fs.readdir);


exports.getBreeds = function () {
    return readDir('./dogs');
};

exports.getBreedPhotos = function (breedName) {

    var directoryName = 'dogs/' + breedName;

    var promiseForDogFiles = readDir(directoryName);

    var promiseForFixedFileNames = promiseForDogFiles.then(function (fileNames) {
        return fileNames.map(function (fileName) {
            return directoryName + '/' + fileName;
        });
    });

    return promiseForFixedFileNames;

};