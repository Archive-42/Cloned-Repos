console.log('executing user-invites.js');

angular.module('user-invites', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/my-invites', {

		    controller: 'UserInvitesCtrl',

		   	templateUrl: 'user-invites/user-invites.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('UserInvitesCtrl', ['$scope', 'currentUser', 'authWatch', '$firebase', function($scope, currentUser, authWatch, $firebase) {

		console.log(' > UserInvitesCtrl');

		var userId = currentUser.provider + ':' + currentUser.id;

		$scope.invitesEmpty = true;

		// check whether the current user has any invites, and update $scope.invitesEmpty if so

		var userRef = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + userId));
			
		var userObj = userRef.$asObject();

		userObj.$loaded().then(function(user) {

			if (userObj.hasOwnProperty('invites')) {

				$scope.invitesEmpty = false;

			} else {

				$scope.invitesEmpty = true;

			}

		});
		
	}]);