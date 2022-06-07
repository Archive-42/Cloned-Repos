const assert = require('assert');
const route = require('../index')();

const order = ['GET','GET','GET','POST','POST','POST'];
const res = {end() {}};
let count = 0;
let a = 0;

route.get('/', () => {
	a++;
});
route.all((req, res) => {
	assert.equal(req.method, order[count]);
	assert.notEqual(req.url, '/');
	count++;
});

route({method:'GET', url:'/'},res);
route({method:'GET', url:'/?query'},res);
route({method:'GET', url:'/a'},res);
route({method:'GET', url:'/abe'},res);
route({method:'GET', url:'/abefest'},res);
route({method:'POST', url:'/a'},res);
route({method:'POST', url:'/abe'},res);
route({method:'POST', url:'/abefest'},res);
route({method:'NOT_GET', url:'/'},res);

assert.equal(count, 6);
assert.equal(a, 2);