console.log(' >> executing create-new-event.js');

angular.module('create-new-event', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/create-new-event', {

		    controller: 'CreateEventCtrl',

		   	templateUrl: 'create-new-event/create-new-event.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('CreateEventCtrl', ['$scope', '$location', 'currentUser', 'authWatch', '$firebase', function($scope, $location, currentUser, authWatch, $firebase) {

		console.log(' > CreateEventCtrl');

		var userId = currentUser.provider + ':' + currentUser.id;
		
		var eventsRef = new Firebase(appConfig.firebaseUrl + '/users/' + userId + '/events');
			
		var events = $firebase(eventsRef);

		var eventsObj = events.$asObject();

		eventsObj.$bindTo($scope, 'events');
	
		$scope.eventResult = '';

		// This empty object will be populated with keys & values from the DOM
		
		$scope.newEvent = {};

		$scope.addEvent = function() {
		
			// Add the new event to this user's Events location in the Firebase

			events.$push({
			
				name: $scope.newEvent.name,
				date: $scope.newEvent.date,
				time: $scope.newEvent.time,
				description: $scope.newEvent.description
			
			});
			
			// We should add a link to the new event to this view
			$scope.eventURL = $location + '';
		
			$scope.eventResult = 'New event created: ' + $scope.newEvent.name;
			
			// Empty the form fields
			$scope.newEvent.name = '';
			$scope.newEvent.date = '';
			$scope.newEvent.time = '';
			$scope.newEvent.description = '';
		
		};
		
	}]);