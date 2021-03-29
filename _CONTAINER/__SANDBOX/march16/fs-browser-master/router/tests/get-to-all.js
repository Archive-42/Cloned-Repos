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
route.all('/', (req, res, callback) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/');
	assert.equal(count, 1);
	count++;
	callback();
});

route({method:'GET', url:'/'}, res, () => {
	assert.equal(count, 2);
	count++;
});

assert.equal(count, 3);