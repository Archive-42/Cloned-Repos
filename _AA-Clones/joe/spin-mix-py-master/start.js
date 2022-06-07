var config = require('./mix.json');
var exec = require('child_process').exec;

exec(`python stitch.py '${JSON.stringify(config)}'`, function (err, stdout) {
    if (err) return console.error(err);
    console.log(stdout);
});