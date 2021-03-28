'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var order = mongoose.model('Order');

router.get('/', function(req, res, next) {
  order.find({}).exec().then(function(orders) {
    res.send(orders);
  }).then(null, next);
});

router.get('/:orderId', function(req, res, next) {
  order.find({ id: req.params.orderId}).exec().then(function(order) {
    res.send(order);
  }).then(null, next);
});

router.post('/create', function(req, res, next) {
  order.create(req.body).then(function(order) {
    res.sendStatus(201);
  }).then(null, next);
});
