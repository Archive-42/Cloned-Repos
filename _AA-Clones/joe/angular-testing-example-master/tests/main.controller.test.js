describe('MainController', function () {

    beforeEach(module('MyApp'));

    var myScope;
    beforeEach(inject(function ($controller) {
        myScope = {};
        mainController = $controller('MainController', {
            $scope: myScope
        });
    }));

    it('should put name on the scope as Joe', function () {
         expect(myScope.myName).to.be.equal('Joe');
    });

});