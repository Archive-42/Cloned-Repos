app.factory('SearchResults', function($rootScope){
	var searchResults = []; 
	return{
		setResults:function(data){
			searchResults = data; 
			$rootScope.$broadcast("search"); 
		},
		getResults:function () {
			return searchResults; 
		}
	}
})