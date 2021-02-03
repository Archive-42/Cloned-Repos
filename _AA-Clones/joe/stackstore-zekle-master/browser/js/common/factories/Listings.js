app.factory('Listings',function($http){
	return {
		getAll:function(){
			return $http.get('/api/listings').then(function(response){
				return response.data;
			})
		},
		createListing:function(formData){
			// console.log("listings factory form data: ",formData);
			return $http.post('/api/listings/create',{
				category:formData.category,
				title:formData.title,
				description:formData.description,
				price:formData.price,
				quantity:formData.quantity
			}).then(function(response){
				console.log(response); 
			})
		},
		getOne:function(id){
			return $http.get('/api/listings/' + id).then(function(response) {
				// console.log('data from Listings factory getOne function: ', response.data);

				return response.data;
			})
		},
		getObjectId:function(listing){
			return listing._id;
		}
	}
})