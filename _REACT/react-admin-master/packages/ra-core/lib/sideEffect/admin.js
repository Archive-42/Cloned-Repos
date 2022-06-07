"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var auth_1 = __importDefault(require("./auth"));
var callback_1 = __importDefault(require("./callback"));
var fetch_1 = __importDefault(require("./fetch"));
var notification_1 = __importDefault(require("./notification"));
var redirection_1 = __importDefault(require("./redirection"));
var accumulate_1 = __importDefault(require("./accumulate"));
var refresh_1 = __importDefault(require("./refresh"));
var undo_1 = __importDefault(require("./undo"));
/**
 * @param {Object} dataProvider A Data Provider function
 * @param {Function} authProvider An Authentication Provider object
 */
exports.default = (function (dataProvider, authProvider) {
    return function admin() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.all([
                        auth_1.default(authProvider)(),
                        undo_1.default(),
                        fetch_1.default(dataProvider)(),
                        accumulate_1.default(),
                        redirection_1.default(),
                        refresh_1.default(),
                        notification_1.default(),
                        callback_1.default(),
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
});
