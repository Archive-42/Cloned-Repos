var fscope = require('../../');

module.exports = function () {
    addEventListener('message', function (ev) {
        postMessage(fscope.worker(ev.data));
    });
};
