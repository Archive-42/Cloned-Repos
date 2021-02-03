app.factory('Signup',function($http){
    return {
        createUser:function(formData){
            console.log("signup factory form data: ",formData);
            return $http.post('/signup',{
            		firstName:formData.firstName, 
            		lastName:formData.lastName, 
            		email:formData.email, 
            		phoneNumber:formData.phoneNumber, 
            		password:formData.password})
            .then(function(response){
                return response.data;
            });
        }
    }
})

