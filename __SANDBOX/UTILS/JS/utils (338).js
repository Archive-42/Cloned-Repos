"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.assertFirstTimeReceived = exports.withPolling = void 0;
function withPolling(callback, interval, timeout) {
    const pollingInterval = setInterval(() => callback(clearPolling), interval);
    const pollingTimeout = setTimeout(() => {
        clearInterval(pollingInterval);
    }, timeout);
    function clearPolling() {
        clearInterval(pollingInterval);
        clearTimeout(pollingTimeout);
    }
}
exports.withPolling = withPolling;
async function assertFirstTimeReceived(key, context) {
    return new Promise((resolve, reject) => {
        if (!context.globalState.get(key)) {
            void context.globalState.update(key, true).then(resolve, reject);
        }
        else {
            reject(new Error("Already happened"));
        }
    });
}
exports.assertFirstTimeReceived = assertFirstTimeReceived;
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
exports.sleep = sleep;
//# sourceMappingURL=utils.js.map