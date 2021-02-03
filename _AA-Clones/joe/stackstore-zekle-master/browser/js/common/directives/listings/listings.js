app.directive('listings', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/listings/listings.html',
		controller: 'ListingsCtrl'
	}
})

// Injecting Listings Factory found at factories/Listings.js
app.controller('ListingsCtrl', function($scope, $state, Listings,SearchResults) {
	//if searchResults exist, $scope.listings = searchresults else get all listings
	$scope.letterLimit = 100;

	Listings.getAll().then(function(data) {
		$scope.listings = data;
		console.log("$scope listings from getAll: ", $scope.listings);
	});

	$scope.getDetails = function(listing){
		var id = Listings.getObjectId(listing);
		$scope.detailsId = id;
		Listings.getOne(id).then(function(data) {
			$scope.listing = Listings.listing = data;
		});


		$state.go('listingState.details');
		// $state.go('listingDetails', {listing: JSON.stringify(obj)});
	}


	$scope.$on("search",function(){
		$scope.listings = SearchResults.getResults();
		$scope.searchRes = true;
		console.log("$scope listings from search", $scope.listings);
	})

});

// state
// url 'listingState.details/:listing'
// $stateParams
// $stateParams.listing -->