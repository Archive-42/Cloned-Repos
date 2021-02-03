var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/category.js');

require('../../../server/db/models/listing.js');
require('../../../server/db/models/order.js');
//require('../../../server/db/models/preferredResult.js');
require('../../../server/db/models/review.js');
require('../../../server/db/models/reviewHistory.js');
require('../../../server/db/models/searchEvent.js');
require('../../../server/db/models/user.js');

//var Item = mongoose.model('Item');
var Category = mongoose.model('Category');
var Listing = mongoose.model('Listing');
var Order = mongoose.model('Order');
var Review = mongoose.model('Review');
var ReviewHistory = mongoose.model('ReviewHistory');
var SearchEvent = mongoose.model('SearchEvent');
//
//function seed(){
//  var user = User.create({
//    name: {
//      first: 'James',
//      last: 'Bond'
//    },
//    phoneNumber: '2125551212'
//  });
//
//
//
//  var listing = Listing.create({
//    title: 'martini',
//    quantity: 1,
//    price: 5,
//    user = user._id
//  })
//}
//
//
//
//
//describe ('Category model', function () {
//
//    beforeEach('Establish DB connection', function (done) {
//        if (mongoose.connection.db) return done();
//        mongoose.connect(dbURI, done);
//        seed();
//    });
//
//    afterEach('Clear test database', function (done) {
//        clearDB(done);
//    });
//
//  // // it('should exist', function () {
//  // //       expect(Category).to.be.a('function');
//  // //   });
//
//  //   describe('category attributes', function () {
//
//  //     // it('should have a name', function () {
//  //     //       expect(Category.name).to.be.a('string');
//  //     //   });
//
//  //       it('should return its subcategories when queried', function () {
//  //         // code to check if the category we created in beforeEach
//  //         // maps to its subcategories we also created in beforeEach
//  //       });
//  //   });
//});
//
////describe ('Item model', function () {
////
////    beforeEach('Establish DB connection', function (done) {
////        if (mongoose.connection.db) return done();
////        mongoose.connect(dbURI, done);
////        seed();
////    });
////
////    afterEach('Clear test database', function (done) {
////        clearDB(done);
////    });
////
////  it('should exist', function () {
////    expect(Item).to.be.a('function');
////    });
////
////  it('should return its corresponding category', function () {
////    expect(Item.category).to.equal
////  })
////
////
////});
//
//describe ('Listing model', function () {
//
//    beforeEach('Establish DB connection', function (done) {
//        if (mongoose.connection.db) return done();
//        mongoose.connect(dbURI, done);
//        seed();
//    });
//
//
//
//  });
//
//    afterEach('Clear test database', function (done) {
//        clearDB(done);
//    });
//
//  it('should exist', function () {
//        expect(Listing).to.be.a('function');
//    });
//
//    describe('Listing attributes', function () {
//
//      it('should have a title', function () {
//            expect(Listing.title).to.be.a('string');
//        });
//
//        it('should have a price', function () {
//            expect(Listing.price).to.be.a('string');
//        });
//
//        it('should return its associated item when queried', function () {
//          // code to check if associated item created in beforeEach is returned
//        });
//
//        it('should return its associated user when queried', function () {
//          // code to check if associated user created in beforeEach is returned
//        });
//    });
//});
//
//describe ('Order model', function () {
//
//    beforeEach('Establish DB connection', function (done) {
//        if (mongoose.connection.db) return done();
//        mongoose.connect(dbURI, done);
//        seed();
//    });
//
//    afterEach('Clear test database', function (done) {
//        clearDB(done);
//    });
//
//  it('should exist', function () {
//        expect(Order).to.be.a('function');
//    });
//
//    describe('Order attributes', function () {
//
//      it('should have an id', function () {
//            expect(Order.id).to.be.a('string');
//        });
//
//        it('should have a cart array', function () {
//            expect(Order.cart).to.be.a('array');
//        });
//
//        it('should have a status', function () {
//            expect(Order.status).to.be.a('string');
//        });
//
//        it('should have a totalPrice', function () {
//            expect(Order.totalPrice).to.be.a('number');
//        });
//    });
//});
//
//// describe ('PreferredResult model', function () {
//
////  //beforeEach
//
////  //afterEach
//
////  it('should exist', function () {
////         expect(PreferredResult).to.be.a('function');
////     });
//
////     describe('PreferredResult attributes', function () {
//
////      it('should return its associated search event when queried', function () {
////          // code to check if associated search event created in beforeEach is returned
////         });
//
////         it('should return its associated selected listing when queried', function () {
////          // code to check if associated selected listing created in beforeEach is returned
////         });
////     });
//// });
//
//describe ('Review model', function () {
//
//    beforeEach('Establish DB connection', function (done) {
//        if (mongoose.connection.db) return done();
//        mongoose.connect(dbURI, done);
//        seed();
//    });
//
//    afterEach('Clear test database', function (done) {
//        clearDB(done);
//    });
//
//  it('should exist', function () {
//        expect(Review).to.be.a('function');
//    });
//
//    describe('Review attributes', function () {
//
//      it('should have a rating', function () {
//            expect(Review.rating).to.be.a('number').between(1).and(5);
//        });
//
//        it('should have comments', function () {
//            expect(Review.comments).to.be.a('string');
//        });
//
//        //it('should return its corresponding item when queried', function () {
//        //  // code to check if the item we created in beforeEach
//        //  // maps to the review
//        //});
//
//    });
//});
//
//describe ('ReviewHistory model', function () {
//
//    beforeEach('Establish DB connection', function (done) {
//        if (mongoose.connection.db) return done();
//        mongoose.connect(dbURI, done);
//        seed();
//    });
//
//    afterEach('Clear test database', function (done) {
//        clearDB(done);
//    });
//
//  it('should exist', function () {
//        expect(ReviewHistory).to.be.a('function');
//    });
//
//    describe('ReviewHistory attributes', function () {
//
//      it('should have an array of reviews', function () {
//            expect(ReviewHistory.reviews).to.be.a('array');
//        });
//
//        it('should have avgStars', function () {
//            expect(ReviewHistory.avgStars).to.be.a('number').between(1).and(5);
//        });
//    });
//});
//
//describe ('SearchEvent model', function () {
//
//    beforeEach('Establish DB connection', function (done) {
//        if (mongoose.connection.db) return done();
//        mongoose.connect(dbURI, done);
//        seed();
//    });
//
//    afterEach('Clear test database', function (done) {
//        clearDB(done);
//    });
//
//  it('should exist', function () {
//        expect(SearchEvent).to.be.a('function');
//    });
//
//    describe('SearchEvent attributes', function () {
//
//      it('should have a queryString', function () {
//            expect(SearchEvent.queryString).to.be.a('string');
//        });
//
//      it('should return its corresponding user when queried', function () {
//          // code to check if the user we created in beforeEach
//          // maps to the search event
//        });
//
//        it('should return its corresponding category when queried', function () {
//          // code to check if the category we created in beforeEach
//          // maps to the search event
//        });
//
//    });
//});