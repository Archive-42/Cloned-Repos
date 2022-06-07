const assert = require('assert');
const route = require('../index')();

const res = {end() {}};
let count = 0;

route.get('/', (req, res, callback) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/');
	assert.equal(count, 0);
	count++;
	callback();
});
route.get('/', (req, res, callback) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/');
	assert.equal(count, 1);
	count++;
	callback();
});

route.get('/err', (req, res, callback) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/err');
	count++;
	callback(new Error('/err'));
});
route.get('/err', (req, res, callback) => {
	assert.ok(false);
});

route({method:'GET', url:'/'}, res, () => {
	assert.equal(count, 2);
	count++;
});
route({method:'GET', url:'/err'}, res, err => {
	assert.equal(err.message, '/err');
	count++;
});

assert.equal(count, 5);