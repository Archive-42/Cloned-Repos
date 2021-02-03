angular.module('app', ['ngRoute', 'socket-io'])

    .config(
    [
        '$routeProvider',
        function($routeProvider) {
            $routeProvider.when(
                '/messenger',
                {
                    templateUrl: 'views/messenger/messenger.html',
                    controller: 'messengerCtrl'
                }
            ).when(
                '/tutorial',
                {
                    templateUrl: 'views/tutorial/tutorial.html',
                    controller: 'tutorialCtrl'
                }
            ).otherwise({redirectTo: '/messenger'});
        }
    ]
)

    .run(
    [
        '$rootScope',
        '$location',
        function($rootScope, $location) {

            $rootScope.goTo = function(path) {
                $location.path(path);
            };

            // Popovers are an opt-in functionality in the Bootstrap version we are using
            // http://getbootstrap.com/javascript/#popovers
            // This function only needs to run once.
            $(function () {
                $('[data-toggle="popover"]').popover()
            });
        }
    ]
);