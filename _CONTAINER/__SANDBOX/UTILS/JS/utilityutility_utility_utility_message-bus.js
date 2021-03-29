"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageBus = void 0;
const vscode_api_1 = require("./vscode-api");
class MessageBus {
    constructor() {
        this.sequenceNumber = 0;
        this.listeners = new Map();
    }
    /**
     * Sends a message to the back-end.
     * @param message Message to send.
     * @returns Sequence number of the message.
     */
    send(message) {
        const sequenceNumber = this.sequenceNumber++;
        const data = Object.assign(Object.assign({}, message), { sequenceNumber });
        vscode_api_1.vscode.postMessage(data);
        return sequenceNumber;
    }
    /**
     * Subscribes to back-end events.
     * @param callback Event handler.
     */
    subscribe(callback) {
        const listener = (e) => {
            const message = e.data;
            callback(message);
        };
        addEventListener('message', listener);
        this.listeners.set(callback, listener);
    }
    /**
     * Unsubscribes from back-end events.
     * @param callback Previously subscribed event handler.
     */
    unsubscribe(callback) {
        const listener = this.listeners.get(callback);
        removeEventListener('message', listener);
        this.listeners.delete(callback);
    }
    /**
     * Sends a message and waits for a matching response.
     * @param responseType The type of the expected response message.
     * @param message The message to send to the back-end.
     */
    call(message) {
        return new Promise(res => {
            const number = this.send(message);
            const callback = m => {
                if (m.sequenceNumber !== number)
                    return;
                this.unsubscribe(callback);
                res(m);
            };
            this.subscribe(callback);
        });
    }
}
exports.messageBus = new MessageBus();
//# sourceMappingURL=message-bus.js.map