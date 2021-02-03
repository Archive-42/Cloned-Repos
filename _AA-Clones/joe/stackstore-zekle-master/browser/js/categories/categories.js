app.config(function($stateProvider) {
    $stateProvider.state('categoriesState', {
        url: '/categories',
        templateUrl: 'js/categories/index.html',
        controller:'ListCategoryCtrl'
    });
    $stateProvider.state('categoriesState.create', {
        url: '/create',
        templateUrl: '/js/categories/create.html',
        controller: 'CreateCategoryCtrl'
    });
});

app.controller('ListCategoryCtrl', function($scope,Categories){
    $scope.categories;
    Categories.getAll().then(function(response){
        $scope.categories=response;
    })
});


app.controller('CreateCategoryCtrl', function($scope, Categories) {
    $scope.CategoryForm;
    $scope.newCategory = function() {
        Categories.createCategory($scope.CategoryForm).then(function(response) {
            console.log(response);
        });
    }
});