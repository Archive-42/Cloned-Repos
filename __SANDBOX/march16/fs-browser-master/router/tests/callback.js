const assert = require('assert');
const route = require('../index')();

const res = {end() {}};
let count = 0;

route.get('/', (req, res, callback) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/');
	count++;
	callback(new Error('/'));
});
route.get('/ok', (req, res, callback) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/ok');
	count++;
	callback();
});

route({method:'GET', url:'/'}, res, err => {
	count++;
	assert.equal(err.message, '/');
});
route({method:'GET', url:'/ok'}, res, err => {
	count++;
	assert.equal(err, undefined);
});

assert.equal(count, 4);