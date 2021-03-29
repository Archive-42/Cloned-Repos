var fscope = require('../../')();
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
