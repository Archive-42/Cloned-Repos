app.directive('search', function(){
	// Runs during compile
	return {
		controller: 'SearchCtrl',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/js/common/directives/search/search.html',
	};
});

app.controller('SearchCtrl',function($scope,$rootScope, $state, Categories,Search,SearchResults){
	$scope.categories;
	Categories.getAll().then(function(data){
		$scope.categories= data;
	})
	$scope.search;
	$scope.fireSearch = function(){
		Search.submitSearch($scope.search.category,$scope.search.input).then(function (results){
			SearchResults.setResults(results);
			delete $scope.search;
			
		});
	};
});