app.factory('Search', function($http) {
	return {
		submitSearch: function(category, str) {
			console.log('search factory firing');
			console.log('submitSearch category: ', category);
			console.log('submitSearch str: ', str);
				return $http.get('/api/search', {
						params: {
							categoryId: category,
							searchStr: str
						}
				})
			.then(function(response) {
				return response.data;
			});
	}
}
})