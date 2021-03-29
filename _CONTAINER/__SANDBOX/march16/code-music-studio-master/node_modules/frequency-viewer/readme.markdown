# frequency-viewer

plot frequencies given raw data

# example

``` js
var fscope = require('frequency-viewer')();
fscope.appendTo('#scope');
setInterval(function () { fscope.draw(data) }, 50);

function fn (t) {
    return sin(440) + sin(2000);
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}

var data = new Float32Array(8000);
var index = 0;

(function next () {
    var t;
    for (var i = 0; i < 8000; i++) {
        t = (index + i) / 44000;
        data[(i+index) % data.length] = fn(t);
    }
    index += i;
    window.requestAnimationFrame(next);
})();
```

If that is too slow, you can also run the fft in a web worker using
[webworkify](https://npmjs.org/package/webworkify):

``` js
var work = require('webworkify');
var w = work(require('./work.js'));
var queue = [];
w.addEventListener('message', function (ev) {
    queue.shift()(ev.data);
});

var fscope = require('frequency-viewer')({
    worker: function (data, cb) {
        queue.push(cb);
        w.postMessage(data);
    }
});
fscope.appendTo('#scope');
setInterval(function () { fscope.draw(data) }, 50);

function fn (t) {
    return sin(440) + sin(2000);
    function sin (x) { return Math.sin(2 * Math.PI * t * x) }
}

var data = new Float32Array(8000);
var index = 0;

(function next () {
    var t;
    for (var i = 0; i < 8000; i++) {
        t = (index + i) / 44000;
        data[(i+index) % data.length] = fn(t);
    }
    index += i;
    window.requestAnimationFrame(next);
})();
```

and in `work.js`:

``` js
var fscope = require('frequency-viewer');

module.exports = function () {
    addEventListener('message', function (ev) {
        postMessage(fscope.worker(ev.data));
    });
};
```

# methods

``` js
var fscope = require('frequency-viewer')
```

## var scope = fscope(opts)

Create a new frequency scope.

You can set the baud rate with `opts.rate`, default: 44000.

You can pass in a custom `opts.worker(function (data, cb) {})` to perform the
fft work in a web worker.

## scope.draw(data)

Update the polyline with `data`, a `Float32Array` of raw data to compute
frequency domain information for.

## scope.appendTo(target)

Append the scope html element to `target`, a query selector string or container
element.

## scope.resize()

Compute the height and width of the container, resizing accordingly.

## var reals = fscope.worker(data)

This is the function that performs the fft. If you want to run the fft code in a
webworker, you can call `fscope.worker()` in your implementation.

# install

With [npm](https://npmjs.org) do:

```
npm install frequency-viewer
```

This module works well in [browserify](http://browserify.org).
To use this module without using browserify, you can download a UMD build from
[browserify cdn](http://wzrd.in/standalone/frequency-viewer@latest).

# license

MIT
