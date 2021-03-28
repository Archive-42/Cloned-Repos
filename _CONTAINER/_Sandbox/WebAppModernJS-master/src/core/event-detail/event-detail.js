console.log('executing event-detail.js');

angular.module('event-detail', [])

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template for this module

		$routeProvider.when('/event/:eventId', {

		    controller: 'EventDetailCtrl',

		   	templateUrl: 'event-detail/event-detail.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('EventDetailCtrl', ['$scope', '$routeParams', 'currentUser', 'authWatch', '$firebase', function($scope, $routeParams, currentUser, authWatch, $firebase) {

		console.log(' > EventDetailCtrl');

		// get the event's details from its Firebase section

		var userId = currentUser.provider + ':' + currentUser.id;
		
		var eventRef = new Firebase(appConfig.firebaseUrl + '/users/' + userId + '/events/' + $routeParams.eventId);
			
		var event = $firebase(eventRef);

		$scope.event = event.$asObject();

		// invite/uninvite code below here

		$scope.inviteUser = function(user) {

			var invitesRef = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + user.$id + '/invites'));

			invitesRef.$push({
				eventId: $scope.event.$id,
				eventName: $scope.event.name
			});
		
			$scope.updateInviteLists();

		};

		$scope.uninviteUser = function(user) {

			// check each invite in this user's invites section

			var invitesRef = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + user.$id + '/invites'));

			var invitesObj = invitesRef.$asObject();

			invitesObj.$loaded().then(function(invites) {

				angular.forEach(invites, function(value, key) {

					// if an invite for this event exists, remove it

					if (value.eventId === $routeParams.eventId) {

						var inviteRef = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + user.$id + '/invites/' + key));

						inviteRef.$remove();

						$scope.updateInviteLists();

					}

				});

			});

		};

		$scope.findMatchingInvite = function(user) {

			var invitesObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + user.$id + '/invites')).$asObject();

			invitesObj.$loaded().then(function(invites) {

				// check whether this user's invites contains one to this event

				angular.forEach(invites, function(value, key) {

					var inviteObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + user.$id + '/invites/' + key)).$asObject();

					inviteObj.$loaded().then(function(invite) {

						if (invite.eventId == $routeParams.eventId) {

							$scope.isInvited(user);

						}

					});

				});

			});

		};

		$scope.updateInviteLists = function() {

			$scope.invitedList = [];

			$scope.uninvitedList = [];

			// get an object representing each user in the Firebase

			var usersObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users/')).$asObject();

			usersObj.$loaded().then(function(users) {

				// iterate through each user in the Users object (except the current user)

				angular.forEach(users, function(value, key) {

					var userObj = $firebase(new Firebase(appConfig.firebaseUrl + '/users/' + key)).$asObject();

					if (key !== userId) {

						// add all users to the uninvited list first

						$scope.uninvitedList.push(userObj);

						// now check each user's invites (if they have any)

						userObj.$loaded().then(function(user) {

							if (user.hasOwnProperty('invites')) {

								$scope.findMatchingInvite(user);

							} else {

								$scope.isNotInvited(user);

							}

						});

					}

				});

			});

		};

		$scope.isInvited = function(user) {

			// add to 'invited' list, if not there already

			if ($.inArray(user, $scope.invitedList) === -1) {

				$scope.invitedList.push(user);

			}

			// remove from 'uninvited' list

			$scope.uninvitedList = jQuery.grep($scope.uninvitedList, function(value) {

				return value.displayName != user.displayName;
			
			});

		};

		$scope.isNotInvited = function(user) {

			// add to 'uninvited' list, if not there already

			if ($.inArray(user, $scope.uninvitedList) === -1) {

				$scope.uninvitedList.push(user);

			}

		};

		$scope.updateInviteLists();
		
	}]);