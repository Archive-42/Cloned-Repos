'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Listings = mongoose.model('Listing');

router.get('/', function(req, res, next) {
  var wordRegExp = new RegExp(req.query.searchStr, "i");
  var categoryArray;
  if (!req.query.categoryId) {
      // console.log(req.query);
      Listings.find({ title: wordRegExp }).exec().then(function(listings) {
        res.send(listings);
      }).then(null, next);
    } else {
      // is this categoryArray necessary?
      // categoryArray = req.query.categoryId.split(',');
      // console.log('this is the array of categories passed from the front: ', categoryArray)
      // Listings.find({ title: wordRegExp, category: {$in: categoryArray }})
      Listings.find({ title: wordRegExp, category: req.query.categoryId._id })
      .exec()
      .then(function(listings) {
        res.send(listings);
      }).then(null, next)
    }
});