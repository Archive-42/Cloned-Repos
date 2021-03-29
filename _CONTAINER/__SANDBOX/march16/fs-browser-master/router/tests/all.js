const assert = require('assert');
const route = require('../index')();

const res = {end() {}};
let count = 0;
const order = ['GET','POST','OPTIONS','HEAD','DELETE','PUT'];

route.all('/', (req, res) => {
	assert.equal(req.method, order[count]);
	assert.equal(req.url, '/');
	count++;
});

route({method:'GET', url:'/'},res);
route({method:'POST', url:'/'},res);
route({method:'OPTIONS', url:'/'},res);
route({method:'HEAD', url:'/'},res);
route({method:'DELETE', url:'/'},res);
route({method:'PUT', url:'/'},res);

route({method:'GET', url:'/a'},res);
route({method:'POST', url:'/a'},res);
route({method:'OPTIONS', url:'/a'},res);
route({method:'HEAD', url:'/a'},res);
route({method:'DELETE', url:'/a'},res);
route({method:'PUT', url:'/a'},res);

route({method:'NOT_GET', url:'/'},res);

assert.equal(count, 6);