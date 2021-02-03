app.directive('openInNewTab', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.attr('target', '_blank');
        }
    };
});