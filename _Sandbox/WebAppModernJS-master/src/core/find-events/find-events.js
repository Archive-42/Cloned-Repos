console.log('executing find-events.js');

angular.module('find-events', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/find-events', {

		    controller: 'FindEventsCtrl',

		   	templateUrl: 'find-events/find-events.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('FindEventsCtrl', ['$scope', '$location', '$routeParams', 'currentUser', 'authWatch', '$firebase', function($scope, $location, $routeParams, currentUser, authWatch, $firebase) {

		console.log(' > FindEventsCtrl');

		var userId = currentUser.provider + ':' + currentUser.id;

		// Check whether we've connected to the Google Maps API already...

		if (typeof google === 'object' && typeof google.maps === 'object') {
		
			console.log('Already connected to Google Maps API');
		
			// ...if so, initialise Google Maps to get the user's position

			gMapsInit();
		
		} else {
		
			// ...if not, connect to the Google Maps API and initialise

			$.getScript('http://maps.google.com/maps/api/js?key=' + appConfig.gMapsAPI + '&sensor=true&callback=gMapsInit');
		
		};

		$scope.getCurrentUserPosition = function() {
		
			// If the browser supports geolocation...

			if (navigator.geolocation) {

				console.log('Getting current user position...');
			
				// ...get the current user's position, success: showMap(), fail: geoError()

				navigator.geolocation.getCurrentPosition($scope.showMap, $scope.geoError, {timeout: 75000, maximumAge: 600000});
			
			} else {
			
				// ...a backup library would go here

				console.log('No native support for this API');
			
			};
		
		};

		$scope.showMap = function(position) {
			
			$scope.currentUserLat = position.coords.latitude;
			
			$scope.currentUserLong = position.coords.longitude;
			
			// Set options for our map

			$scope.currentUserPosOptions = {
	        	zoom: 13,
	        	center: new google.maps.LatLng($scope.currentUserLat, $scope.currentUserLong)
	        };
	        
	        $scope.mapDiv = document.getElementById('currentUserPosMap');
	        
	        // Show a map in the selected DOM element with chosen settings

	        $scope.map = new google.maps.Map($scope.mapDiv, $scope.currentUserPosOptions);
	        
	        // Add a marker to the map to show the current user position

	        $scope.userMarker = new google.maps.Marker({
	        
	        	position: $scope.currentUserPosOptions.center,
	        	map: $scope.map
	        
	        });

	        // look for nearby events to add to the map

	        $scope.eventsNearUser();

		};

		$scope.eventsNearUser = function() {

			// connect to the /users/ section of the Firebase to get a 'users' object

			var usersObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users')).$asObject();

			usersObj.$loaded().then(function(users) {

				// iterate through each user's /events/ section to get 'events' objects

				angular.forEach(users, function(user, userId) {

		        	var eventsObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + userId + '/events/')).$asObject();

		        	eventsObj.$loaded().then(function(events) {

			          	// iterate through each event in the 'events' objects

			          	angular.forEach(events, function(event, eventId) {

			          		var eventObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + userId + '/events/' + eventId)).$asObject();

			          		if ( event.hasOwnProperty('location') ) {

								$scope.putEventOnMap(eventObj);

			          		};

			          	});

		        	});

		       });

			});

		};

		var eventInfoWindows = [];

		$scope.putEventOnMap = function(eventObj) {

			eventObj.$loaded().then(function(event) {

				// if an event is near the user

				if ($scope.findDistance($scope.currentUserLat, $scope.currentUserLong, event.location[0], event.location[1]) < 5) {
										
					// create an EventInfoWindow (marker) for the event

					eventInfoWindows[event.$id] = new google.maps.InfoWindow({
					
						content: '<b>' + event.name + '</b><br>' + event.description
					
					});
					
					// ...and add that marker to the map

					eventInfoWindows[event.$id].open($scope.map, new google.maps.Marker({
				
						position: new google.maps.LatLng(event.location[0], event.location[1]),
				
						map: $scope.map
				
					  }));

				} else {
				
					console.log(event.name + ' is more than 5km away from user');
				
				}

			});

		};

		$scope.findDistance = function(lat1, lon1, lat2, lon2) {
			
			var R = 6371; // mean radius of Earth in km
			
			var a = 0.5 - Math.cos((lat2 - lat1) * Math.PI / 180)/2 + 
			 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
			 (1 - Math.cos((lon2 - lon1) * Math.PI / 180))/2;
			
			return R * 2 * Math.asin(Math.sqrt(a));
			
		};

		$scope.geoError = function(error) {
		
			if (error == 1) {
			
				console.log('The user denied access to their current location');
			
			} else if (error == 2) {
			
				console.log('Connectivity issue (no network connection, or no satellite connection)');
			
			} else if (error == 3) {
			
				console.log('Request timeout');
			
			}
		
		};

		window.gMapsInit = function() {

			$scope.getCurrentUserPosition();

		};
		
	}]);