'use strict';

console.log(' >> executing app.js');

// store some API keys and other useful strings

var appConfig = {

	firebaseUrl: 'https://lait-partyplanner.firebaseio.com',
	gMapsAPI: 'AIzaSyBefCUKkAfHHo_hYDxFeLaDGyehfO8GsXE'

};

// create an Angular module representing our app and register its component modules

angular.module('PartyPlannerApp', [

	'ngRoute',
	'firebase',
	'angus.templates.app',
	'user-profile',
	'user-events',
	'create-new-event',
	'event-detail',
	'user-invites',
	'find-events'

]);

// manually bootstrap our app

angular.element(document).ready(function() {

  angular.bootstrap(document, ['PartyPlannerApp']);

});

// configuration settings for our app

angular.module('PartyPlannerApp').config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	
	// configure how the app's deep-linking paths are stored

	$locationProvider.html5Mode(true);

	// if in doubt about routing/views, show the user the home view
	
	$routeProvider.otherwise({redirectTo:'/'});

	delete $httpProvider.defaults.headers.common["X-Requested-With"];

}]);

// this factory connects us to our Firebase for authentication tasks

angular.module('PartyPlannerApp').factory('userAuth', ['$firebaseSimpleLogin', function($firebaseSimpleLogin) {

	var firebaseRef = new Firebase(appConfig.firebaseUrl);

	return $firebaseSimpleLogin(firebaseRef);

}]);

// this factory watches for changes in the user's authentication status

angular.module('PartyPlannerApp').factory('authWatch', ['$location', function($location) {

	var authRef = new Firebase(appConfig.firebaseUrl + '/.info/authenticated');

	authRef.on('value', function(snapshot) {

		if (snapshot.val() === true) {

			console.log('authRef change: user logged in');

			$('.logout').show();

			$location.path('/my-profile');

		} else {

			console.log('authRef change: user not logged in');

			$('.logout').hide();

			$location.path('/');

		}

	});

	return true;

}]);

// HomeCtrl and its routing are set up here

angular.module('PartyPlannerApp')

	.config(['$routeProvider', function($routeProvider) {

	  // fetch the correct HTML template / view for this module

		$routeProvider.when('/', {

		    controller: 'HomeCtrl',

		   	templateUrl: 'homepage/homepage.tpl.html',

		    resolve: {

		    	// controller will not be loaded until $getCurrentUser resolves
      
      			currentUser: ['userAuth', function(userAuth) {
        		
        			// $getCurrentUser returns a promise so the resolve waits for it to complete

					return userAuth.$getCurrentUser();
      			
      			}]

		    }

		})

	}])

	.controller('HeaderCtrl', ['$scope', '$location', 'userAuth', function($scope, $location, userAuth) {

		// the logout button in the header should log the user out

		$('.logout input[type="button"]').click(function() {

			userAuth.$logout();

			console.log('user logged out');

			$location.path('/');

		});

	}])

	.controller('HomeCtrl', ['$scope', '$location', 'userAuth', 'authWatch', 'currentUser', function($scope, $location, userAuth, authWatch, currentUser) {

		console.log(' > HomeCtrl');

		// when the .login-twitter button is clicked, log the user in with their Twitter account
		// (detailed instructions: https://www.firebase.com/docs/web/guide/simple-login/twitter.html)

		$('input[type="button"].login-twitter').click(function() {
			
			userAuth.$login('twitter').then(function(user) {

				// when a user logs in, set/update their Firebase entry

				var firebaseRef = new Firebase(appConfig.firebaseUrl);

				firebaseRef.child('users').child(user.uid).update({

					displayName: user.displayName,
					provider: user.provider,
					provider_id: user.id,
					// need function to remove '_normal' from end of image URL
					picture: user.thirdPartyUserData.profile_image_url
				
				});

				console.log('Logged in with Twitter');

			});

		});

		$('input[type="button"].login-facebook').click(function() {
			
			userAuth.$login('facebook').then(function(user) {

				// when a user logs in, set/update their Firebase entry

				var firebaseRef = new Firebase(appConfig.firebaseUrl);

				firebaseRef.child('users').child(user.uid).set({

					displayName: user.displayName,
					provider: user.provider,
					provider_id: user.id,
					picture: user.thirdPartyUserData.picture.data.url
				
				});

				console.log('Logged in with Facebook');

			});

		});

		// if the user is already logged in, show them their profile

		if (currentUser) {

			$location.path('/my-profile');

		}

	}]);