var app = angular.module('PuppyAdopt', []);

app.controller('MainController', function (Puppies, $scope) {
    $scope.myPuppy = Puppies[0];
    $scope.favoriteDog = Puppies[1];
});