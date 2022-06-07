app.factory('Categories', function($http){
	return{
		getAll:function(){
			return $http.get('/api/categories').then(function(response){
				return response.data; 
			});
		},
		createCategory:function(data){
			return $http.post('/api/categories/',{name:data.name}).then(function(response){
				return response;
			});
		}
	};
})