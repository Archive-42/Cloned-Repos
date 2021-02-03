var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/', function (req, res, next) {
    if (req.session.loggedIn) {
        res.redirect('/admin/importantPage');
    } else {
        res.render('admin-login');
    }
});

router.post('/', function (req, res, next) {

    if (req.body.name === 'Joe' && req.body.password === '123') {
        // Log myself in.
        //sessionMemory[req.cookies.sessionId].loggedIn = true;
        req.session.loggedIn = true;
        res.redirect('/admin/importantPage');
    } else {
        res.redirect('/admin');
    }

});

router.get('/importantPage', function (req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/admin');
    }
}, function (req, res, next) {
    res.send('TOP SECRET!');
});