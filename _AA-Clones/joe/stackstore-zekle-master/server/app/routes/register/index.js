'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');


router.post('/create', function(req, res, next) {
    console.log('hitting the create route');
    console.log(req.body);
    User.create(req.body).then(function(user) {
        console.log('...creating user...')
        res.sendStatus(201);
    }).then(null, next);
});

