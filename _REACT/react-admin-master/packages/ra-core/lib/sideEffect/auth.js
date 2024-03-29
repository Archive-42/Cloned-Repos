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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFetchError = exports.handleLogout = exports.handleCheck = exports.handleLogin = void 0;
var effects_1 = require("redux-saga/effects");
var connected_react_router_1 = require("connected-react-router");
var notificationActions_1 = require("../actions/notificationActions");
var authActions_1 = require("../actions/authActions");
var fetchActions_1 = require("../actions/fetchActions");
var clearActions_1 = require("../actions/clearActions");
exports.default = (function (authProvider) {
    if (!authProvider) {
        return function () { return null; };
    }
    return function watchAuthActions() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, effects_1.all([
                        effects_1.takeEvery(authActions_1.USER_LOGIN, exports.handleLogin(authProvider)),
                        effects_1.takeEvery(authActions_1.USER_CHECK, exports.handleCheck(authProvider)),
                        effects_1.takeEvery(authActions_1.USER_LOGOUT, exports.handleLogout(authProvider)),
                        effects_1.takeLatest(fetchActions_1.FETCH_ERROR, exports.handleFetchError(authProvider)),
                    ])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
});
var nextPathnameSelector = function (state) {
    var locationState = state.router.location.state;
    return locationState && locationState.nextPathname;
};
var currentPathnameSelector = function (state) { return state.router.location; };
var getErrorMessage = function (error, defaultMessage) {
    return typeof error === 'string'
        ? error
        : typeof error === 'undefined' || !error.message
            ? defaultMessage
            : error.message;
};
var handleLogin = function (authProvider) {
    return function (action) {
        var payload, meta, authPayload, redirectTo, e_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = action.payload, meta = action.meta;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 10]);
                    return [4 /*yield*/, effects_1.put({ type: authActions_1.USER_LOGIN_LOADING })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, effects_1.call([authProvider, 'login'], payload)];
                case 3:
                    authPayload = _a.sent();
                    return [4 /*yield*/, effects_1.put({
                            type: authActions_1.USER_LOGIN_SUCCESS,
                            payload: authPayload,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, meta.pathName ||
                            effects_1.select(nextPathnameSelector)];
                case 5:
                    redirectTo = _a.sent();
                    return [4 /*yield*/, effects_1.put(connected_react_router_1.push(redirectTo || '/'))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 7:
                    e_1 = _a.sent();
                    return [4 /*yield*/, effects_1.put({
                            type: authActions_1.USER_LOGIN_FAILURE,
                            error: e_1,
                            meta: { auth: true },
                        })];
                case 8:
                    _a.sent();
                    errorMessage = getErrorMessage(e_1, 'ra.auth.sign_in_error');
                    return [4 /*yield*/, effects_1.put(notificationActions_1.showNotification(errorMessage, 'warning'))];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    };
};
exports.handleLogin = handleLogin;
var handleCheck = function (authProvider) {
    return function (action) {
        var payload, meta, error_1, redirectTo, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = action.payload, meta = action.meta;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 8]);
                    return [4 /*yield*/, effects_1.call([authProvider, 'checkAuth'], payload)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 3:
                    error_1 = _a.sent();
                    return [4 /*yield*/, effects_1.call([authProvider, 'logout'], undefined)];
                case 4:
                    redirectTo = _a.sent();
                    return [4 /*yield*/, effects_1.put(connected_react_router_1.replace({
                            pathname: (error_1 && error_1.redirectTo) || redirectTo || '/login',
                            state: { nextPathname: meta.pathName },
                        }))];
                case 5:
                    _a.sent();
                    // Clear the state before showing a notification as it would be dismissed immediately otherwise
                    return [4 /*yield*/, effects_1.put(clearActions_1.clearState())];
                case 6:
                    // Clear the state before showing a notification as it would be dismissed immediately otherwise
                    _a.sent();
                    errorMessage = getErrorMessage(error_1, 'ra.auth.auth_check_error');
                    return [4 /*yield*/, effects_1.put(notificationActions_1.showNotification(errorMessage, 'warning'))];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    };
};
exports.handleCheck = handleCheck;
var handleLogout = function (authProvider) {
    return function (action) {
        var payload, redirectTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = action.payload;
                    return [4 /*yield*/, effects_1.call([authProvider, 'logout'], undefined)];
                case 1:
                    redirectTo = _a.sent();
                    return [4 /*yield*/, effects_1.put(connected_react_router_1.push((payload && payload.redirectTo) || redirectTo || '/login'))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, effects_1.put(clearActions_1.clearState())];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    };
};
exports.handleLogout = handleLogout;
var handleFetchError = function (authProvider) {
    return function (action) {
        var error, e_2, nextPathname, redirectTo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = action.error;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 10]);
                    return [4 /*yield*/, effects_1.call([authProvider, 'checkError'], error)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 3:
                    e_2 = _a.sent();
                    return [4 /*yield*/, effects_1.select(currentPathnameSelector)];
                case 4:
                    nextPathname = _a.sent();
                    return [4 /*yield*/, effects_1.call([authProvider, 'logout'], undefined)];
                case 5:
                    redirectTo = _a.sent();
                    return [4 /*yield*/, effects_1.put(connected_react_router_1.push({
                            pathname: redirectTo || '/login',
                            state: { nextPathname: nextPathname },
                        }))];
                case 6:
                    _a.sent();
                    // Clear the state before showing a notification as it would be dismissed immediately otherwise
                    return [4 /*yield*/, effects_1.put(clearActions_1.clearState())];
                case 7:
                    // Clear the state before showing a notification as it would be dismissed immediately otherwise
                    _a.sent();
                    return [4 /*yield*/, effects_1.put(notificationActions_1.hideNotification())];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, effects_1.put(notificationActions_1.showNotification('ra.notification.logged_out', 'warning'))];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    };
};
exports.handleFetchError = handleFetchError;
