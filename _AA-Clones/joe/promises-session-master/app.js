var app = angular.module('PuppiesObv', []);

app.controller('MainCtrl', function ($scope, Puppies) {

    $scope.breeds = [];
    $scope.photos = [];
    $scope.error = null;

    Puppies.getBreeds().then(function (breeds) {
        $scope.breeds = breeds;
    });

    $scope.getBreedPhotos = function (breed) {

        Puppies.getPhotos(breed).then(function (photos) {
            $scope.photos = photos;
        }).catch(function (err) {
            $scope.error = err.message;
        });

    };

});

app.factory('Timeout', function ($q) {

    return function (promise, delay) {

        return new $q(function (resolve, reject) {
            promise.then(resolve);
            setTimeout(function () {
                reject(new Error('Request timed out!'));
            }, delay);
        });

    };

});


app.factory('Puppies', function ($http, Timeout) {

    return {

        getBreeds: function () {
            return $http.get('/breeds').then(function (response) {
                return response.data;
            });
        },

        getPhotos: function (breedName) {
            var request = $http.get('/photos/' + breedName).then(function (response) {
                return response.data;
            });
            return Timeout(request, 1000);
        }

    };

});