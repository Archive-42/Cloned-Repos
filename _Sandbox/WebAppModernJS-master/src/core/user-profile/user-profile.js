console.log(' >> executing user-profile.js');

angular.module('user-profile', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/my-profile', {

		    controller: 'UserProfileCtrl',

		   	templateUrl: 'user-profile/user-profile.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('UserProfileCtrl', ['$scope', 'currentUser', 'authWatch', function($scope, currentUser, authWatch) {

		console.log(' > UserProfileCtrl');

		$scope.user = currentUser;
		
	}]);