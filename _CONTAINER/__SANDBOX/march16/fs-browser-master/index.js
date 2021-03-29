const fs = require('fs'), http = require('http'), dir = process.cwd(), parent = dir.slice(dir.lastIndexOf('/')), filed = require('filed'), ecstatic = require('ecstatic')(__dirname + '/public'), handlebars = require('handlebars'), route = require('./router')();

const source = fs.readFileSync('./public/index.html', 'utf8');
const template = handlebars.compile(source);
const fd = dir.split('/').splice(1);
const state = {};
const current = {};
const p = {};
let d;

console.log(fd)

fd.forEach(e => {
	d[e] = {}
	d = p[e]
})

console.log(state)

current[parent] = {};

fs.readdir(dir, (e, d) => {
	
	if(e) console.error(e);
	
	d.forEach(e => {
		fs.stat(e, (err, r) => {
			if(r.isDirectory()){
				current[parent]['/' + e] = {};
			}
			else{
				current[parent]['-' + e] = {};
			}
		})
	})
	
});


route.get('/path/{path}', (req, res) => {
	res.writeHead(200, {
		'Content-Type' : 'text/json'
	});
	
	res.end(JSON.stringify(current[parent]))
})


const server = http.createServer((req, res) => {
	
    route(req, res, () => {
	    ecstatic(req, res)	 
    })
	
}).listen(7000);

/*
if(req.url == '/'){
	
  res.statusCode = 302;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Location', dir);
  res.end('Redirecting to ' + dir);
  return

}
*/