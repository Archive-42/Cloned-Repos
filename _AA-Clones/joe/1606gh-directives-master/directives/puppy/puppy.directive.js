app.directive('puppy', function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/puppy/puppy.html',
        scope: {
            dog: '='
        },
        link: function (scope) {
            console.log(scope);
        }
    };
});
