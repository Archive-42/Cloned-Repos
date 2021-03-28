var async = {};

async.map = function (originalArray, iterator, finalCallback) {

    // originalArray: ['./shapes.js', './Puppy_2.jpg', './square.js']

    var iterationsCompleted = 0;
    var transformedArray = [];
    var lengthOfOriginalArray = originalArray.length;

    originalArray.forEach(function (element, index) {

        var completedFn = function (err, transformedValue) {

            if (err) {
                finalCallback(err);
                return;
            }

            transformedArray[index] = transformedValue;
            iterationsCompleted++;

            if (iterationsCompleted === lengthOfOriginalArray) {
                finalCallback(null, transformedArray);
            }

        };

        iterator(element, completedFn);

    });

};

module.exports = async;