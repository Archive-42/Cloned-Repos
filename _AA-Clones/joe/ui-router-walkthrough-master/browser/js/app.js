'use strict';
var app = angular.module('PuppiesRMe', ['ui.router', 'fsaPreBuilt']);

app.controller('HomeCtrl', function ($scope) {

});

app.controller('ListCtrl', function ($scope) {

    $scope.puppies = [
        'Yellow Labrador',
        'Beagle',
        'Corgi',
        'Rottweiler'
    ];

});

app.factory('PuppyData', function () {

    return {
        'Beagle': {
            info: 'Really cute, won best in show this year.',
            image: 'http://fc01.deviantart.net/fs70/f/2014/269/d/f/puppy_pictures_cute_beagle_puppy_by_nadinezterbird4-d80nqiu.jpg'
        },
        'Yellow Labrador': {
            info: 'Joes favorite dog.',
            image: 'http://images.nationalgeographic.com/wpf/media-live/photos/000/347/cache/golden-labrador-puppy_34708_990x742.jpg'
        },
        'Corgi': {
            info: 'Comes in many colors',
            image: 'http://www.tehcute.com/pics/201109/corgi-puppy-on-a-couch.jpg'
        },
        'Rottweiler': {
            info: 'Much sweeter than people think.',
            image: 'http://cdn-6.dooziedog.com/dog_breeds/rottweiler/images/full/Rottweiler-Puppy-4.jpg'
        }
    };

});

app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/',
        template: '<h1>Home page!</h1>',
        controller: 'HomeCtrl'
    });
});

app.config(function ($stateProvider) {

    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'js/list.html',
        controller: 'ListCtrl'
    });

    $stateProvider.state('list.about', {
        url: '/:puppy/about',
        template: '<h1>{{ aboutBreed }}</h1>',
        controller: function ($scope, $state, $stateParams, PuppyData) {

            if (!$stateParams.puppy) {
                $state.go('list.about', { puppy: 'Yellow Labrador' });
            } else {
                var breed = $stateParams.puppy;
                $scope.aboutBreed = PuppyData[breed].info;
            }



        }
    });

    $stateProvider.state('list.gallery', {
        url: '/:puppy/gallery',
        template: '<img style="width: 500px;" ng-src="{{ puppyImage }}" />',
        controller: function ($scope, $stateParams, PuppyData, $state) {



            $scope.puppyImage = PuppyData[$stateParams.puppy].image;


        }
    });

});




// http://www.tehcute.com/pics/201109/corgi-puppy-on-a-couch.jpg
//

//