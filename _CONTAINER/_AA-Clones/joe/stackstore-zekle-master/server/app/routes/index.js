'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));
router.use('/reviews', require('./reviews'));
router.use('/listings', require('./listings'));
router.use('/orders', require('./orders'));
router.use('/search', require('./search'));
router.use('/categories', require('./categories'));
router.use('/register', require('./register'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});