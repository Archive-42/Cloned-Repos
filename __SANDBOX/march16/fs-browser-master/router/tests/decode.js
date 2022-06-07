const assert = require('assert');
const route = require('../index')();

const res = {end() {}};
let count = 0;

route.get('/{a}/*', (req, res) => {
	assert.equal(req.params.a, 'a c');
	assert.equal(req.params.wildcard, 'b c/c d');
	assert.equal(req.url, '/a%20c/b%20c/c%20d');
	count++;
});

route({method:'GET', url:'/a%20c/b%20c/c%20d'},res);

assert.equal(count, 1);