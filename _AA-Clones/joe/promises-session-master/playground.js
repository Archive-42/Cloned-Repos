var akitaPath = '/Users/databentpx/fullstack/promises-session/dogs/akita/akita1.jpg';
var goldenPath = '/Users/databentpx/fullstack/promises-session/dogs/golden_retriever/golden_retriever1.jpg';
var otherDogPath = '/Users/databentpx/fullstack/promises-session/dogs/american_english_coonhound/american_english_coonhound1.jpg';
var anotherPath = '/Users/databentpx/fullstack/promises-session/dogs/american_foxhound/american_foxhound1.jpg';

var Promise = require('bluebird');
var fs = require('fs');
var readFile = Promise.promisify(fs.readFile);

var all = function (promises) {

    var promisesResolved = 0;
    var lengthOfPromises = promises.length;
    var resolvedValues = [];

    return new Promise(function (resolve, reject) {

        promises.forEach(function (promise, index) {

            promise.then(function (value) {

                resolvedValues[index] = value;

                promisesResolved++;

                if (promisesResolved === lengthOfPromises) {
                    resolve(resolvedValues);
                }

            }, function (err) {
                reject(err);
            });

        });

    });

};

var promiseForAkita = readFile(akitaPath);
var promiseForGolden = readFile(goldenPath);
var promiseForOtherDog = readFile(otherDogPath);
var promiseForLastDog = readFile(anotherPath);

Promise.all([
    promiseForAkita,
    promiseForGolden,
    promiseForOtherDog,
    promiseForLastDog
]).then(function (dogImages) {
    console.log(dogImages.length);
}, function (err) {
    console.error(err);
});