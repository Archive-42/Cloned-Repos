module.exports = function (latency) {
    return function (req, res, next) {
        setTimeout(next, latency);
    };
};