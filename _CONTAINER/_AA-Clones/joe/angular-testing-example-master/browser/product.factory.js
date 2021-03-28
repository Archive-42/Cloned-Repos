app.factory('ProductFactory', function ($http) {
  return {
    getAllProducts: function () {
      return $http.get('/products')
          .then(function (response) {
            return response.data;
          });
    },
    addNewProduct: function (info) {
      return $http.post('/products', info);
    }
  };
});