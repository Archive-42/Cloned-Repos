"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replayStackedCalls = exports.stackOptimisticCall = exports.stackCall = exports.getRemainingStackedCalls = void 0;
var doQuery_1 = require("./doQuery");
var nbRemainingStackedCalls = 0;
var getRemainingStackedCalls = function () { return nbRemainingStackedCalls; };
exports.getRemainingStackedCalls = getRemainingStackedCalls;
// List of dataProvider calls emitted while in optimistic mode.
// These calls get replayed once the dataProvider exits optimistic mode
var stackedCalls = [];
var stackCall = function (params) {
    stackedCalls.push(params);
    nbRemainingStackedCalls++;
};
exports.stackCall = stackCall;
var stackedOptimisticCalls = [];
var stackOptimisticCall = function (params) {
    stackedOptimisticCalls.push(params);
    nbRemainingStackedCalls++;
};
exports.stackOptimisticCall = stackOptimisticCall;
// Replay calls recorded while in optimistic mode
var replayStackedCalls = function () { return __awaiter(void 0, void 0, void 0, function () {
    var clone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(stackedOptimisticCalls.length > 0)) return [3 /*break*/, 2];
                clone = __spreadArrays(stackedOptimisticCalls);
                // remove these calls from the list *before* doing them
                // because side effects in the calls can add more calls
                // so we don't want to erase these.
                stackedOptimisticCalls.splice(0, stackedOptimisticCalls.length);
                return [4 /*yield*/, Promise.all(clone.map(function (params) { return Promise.resolve(doQuery_1.doQuery.call(null, params)); }))];
            case 1:
                _a.sent();
                // once the calls are finished, decrease the number of remaining calls
                nbRemainingStackedCalls -= clone.length;
                return [3 /*break*/, 4];
            case 2:
                clone = __spreadArrays(stackedCalls);
                // remove these calls from the list *before* doing them
                // because side effects in the calls can add more calls
                // so we don't want to erase these.
                stackedCalls.splice(0, stackedCalls.length);
                return [4 /*yield*/, Promise.all(clone.map(function (params) { return Promise.resolve(doQuery_1.doQuery.call(null, params)); }))];
            case 3:
                _a.sent();
                // once the calls are finished, decrease the number of remaining calls
                nbRemainingStackedCalls -= clone.length;
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.replayStackedCalls = replayStackedCalls;
