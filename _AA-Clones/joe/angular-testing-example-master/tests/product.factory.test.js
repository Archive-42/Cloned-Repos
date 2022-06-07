describe('ProductFactory', function () {

    beforeEach(module('MyApp'));

    var ProductFactory, $httpBackend;
    beforeEach(inject(function (_ProductFactory_, _$httpBackend_) {
        ProductFactory = _ProductFactory_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be an object', function () {
        expect(ProductFactory).to.be.an('object');
    });

    describe('getAllProducts', function () {

        it('should hit the right URL', function () {
            $httpBackend.expectGET('/products').respond([]);
            ProductFactory.getAllProducts();
            $httpBackend.flush();
        });

        it('should resolve to response data', function (done) {
           $httpBackend.expectGET('/products').respond([{name: 'Blender'}]);
            ProductFactory.getAllProducts()
                .then(function (products) {
                    expect(products).to.be.deep.equal([{name: 'Blender'}]);
                    done();
                })
                .catch(done);
            $httpBackend.flush();
        });

    });

});