const assert = require('assert');
const route = require('../index')();

const res = {end() {}};
let count = 0;

route.get('/', (req, res) => {
	assert.equal(req.method, 'GET');
	assert.equal(req.url, '/');
	count++;
});

route({method:'GET', url:'/'},res);
route({method:'NOT_GET', url:'/'},res);

assert.equal(count, 1);