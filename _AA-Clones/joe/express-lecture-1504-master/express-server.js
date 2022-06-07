var express = require('express');
var path = require('path');
var fs = require('fs');
var swig = require('swig');

var expressPipeline = express();

expressPipeline.engine('html', swig.renderFile);
expressPipeline.set('view engine', 'html');
expressPipeline.set('views', __dirname + '/views');

expressPipeline.listen(1337);

//var serveFile = function (req, res, next) {
//
//    var possibleFilePath = path.join(__dirname, req.url.slice(1));
//
//    fs.exists(possibleFilePath, function (exists) {
//        if (exists) {
//            fs.stat(possibleFilePath, function (err, stat) {
//                if (stat.isDirectory()) {
//                    next();
//                } else {
//                    res.sendFile(possibleFilePath);
//                }
//            });
//        } else {
//            next();
//        }
//    });
//
//};

expressPipeline.use(express.static(__dirname));

expressPipeline.use(function (req, res, next) {

    req.joe = true;
    next();

});

expressPipeline.get('/products', function (req, res) {

    console.log(req.joe);

    var category = req.query.category;

    console.log(req.query);

    if (typeof category !== 'undefined') {
        res.send(products.filter(function (product) {
            return product.category === category;
        }));
    } else {
        res.send(products);
    }

});

expressPipeline.get('/puppy/:puppyName', function (req, res) {
    console.log(req.params);
    if (req.params.puppyName === 'corgi') {
        res.send('Aw they so cute they got little fluff butts');
    } else if (req.params.puppyName === 'golden') {
        res.send('These are joes favorite doggies');
    } else {
        res.send('I love all dogs so whatevz');
    }
});

expressPipeline.get('/joe', function (req, res) {
    res.send(joe);
});

expressPipeline.get('/', function (req, res) {
    var htmlPath = path.join(__dirname, 'home.html');
    res.sendFile(htmlPath);
});

var users = {
    'Joe': {
        name: 'Joe',
        likes: ['Coding', 'Lecturing', 'Guitar', 'MtG']
    },
    'Tyler': {
        name: 'Tyler',
        likes: ['Eat', 'Snowboard', 'Surf']
    },
    'Eunice': {
        name: 'Eunice',
        likes: ['Dancing', 'Scubaing', 'Eat']
    }
};

expressPipeline.get('/user/:userName', function (req, res) {

    var name = req.params.userName;

    var userData = users[name];

    res.render('user', {user: userData});

});

expressPipeline.use(function (req, res) {
    res.status(404).send('Not found!');
});