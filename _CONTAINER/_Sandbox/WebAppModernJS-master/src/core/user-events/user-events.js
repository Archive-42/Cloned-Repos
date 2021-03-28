console.log(' >> executing user-events.js');

angular.module('user-events', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/my-events', {

		    controller: 'UserEventsCtrl',

		   	templateUrl: 'user-events/user-events.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('UserEventsCtrl', ['$scope', 'currentUser', 'authWatch', '$firebase', function($scope, currentUser, authWatch, $firebase) {

		console.log(' > UserEventsCtrl');

		var userId = currentUser.provider + ':' + currentUser.id;
		
		$scope.orderProp = 'date';
		
		// for our user-events template, we need an events object containing the data from the current user's section of our Firebase

		var eventsRef = new Firebase(appConfig.firebaseUrl + '/users/' + userId + '/events');
			
		var events = $firebase(eventsRef);

		var eventsObj = events.$asObject();

		eventsObj.$bindTo($scope, 'events');

		// clicking an event's 'remove' link removes that event from the Firebase

		$scope.removeEvent = function(eventId) {

			events.$remove(eventId);
		
		};
		
	}]);