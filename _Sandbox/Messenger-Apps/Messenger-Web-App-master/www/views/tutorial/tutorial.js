angular.module('app')

.controller(
    'tutorialCtrl',
    [
        '$rootScope',
        '$scope',
        function($rootScope, $scope) {
            "use strict";

            $scope.tutorial = {
                headerTitle: "Tutorial"
            };

        }
    ]
);