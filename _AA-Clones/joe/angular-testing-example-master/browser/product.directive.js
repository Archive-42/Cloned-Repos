app.directive('product', function () {
    return {
        restrict: 'E',
        template: '<h1>{{ product.name }}</h1>'
    };
});