describe('<product>', function () {

    beforeEach(module('MyApp'));

    var $compile, myScope;
    beforeEach(inject(function (_$compile_, $rootScope) {
        $compile = _$compile_;
        myScope = $rootScope.$new();
    }));

    it('should produce expected HTML', function () {

        var element = $compile('<product></product>')(myScope);

        myScope.product = { name: 'Blender' };
        myScope.$digest();

        expect(element.text()).to.be.equal('Blender');

    });

});