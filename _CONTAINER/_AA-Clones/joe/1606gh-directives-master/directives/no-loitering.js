app.directive('noLoitering', function () {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var yellTimeout;
            var timeout = parseInt(attrs.noLoitering, 10) * 1000;

            element.on('mouseenter', function () {
                yellTimeout = setTimeout(function () {
                    alert('GET OFF MY LAWN');
                }, timeout);
            });

            element.on('mouseleave', function () {
                clearTimeout(yellTimeout);
            });

        }
    };

});