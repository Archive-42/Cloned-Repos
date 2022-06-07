"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performUndoableQuery = void 0;
var validateResponseFormat_1 = __importDefault(require("../validateResponseFormat"));
var getFetchType_1 = __importDefault(require("../getFetchType"));
var undoableEventEmitter_1 = __importDefault(require("../undoableEventEmitter"));
var undoActions_1 = require("../../actions/undoActions");
var notificationActions_1 = require("../../actions/notificationActions");
var uiActions_1 = require("../../actions/uiActions");
var fetchActions_1 = require("../../actions/fetchActions");
var stackedCalls_1 = require("./stackedCalls");
/**
 * In undoable mode, the hook dispatches an optimistic action and executes
 * the success side effects right away. Then it waits for a few seconds to
 * actually call the dataProvider - unless the user dispatches an Undo action.
 *
 * We call that "optimistic" because the hook returns a resolved Promise
 * immediately (although it has an empty value). That only works if the
 * caller reads the result from the Redux store, not from the Promise.
 */
var performUndoableQuery = function (_a) {
    var type = _a.type, payload = _a.payload, resource = _a.resource, action = _a.action, rest = _a.rest, onSuccess = _a.onSuccess, onFailure = _a.onFailure, dataProvider = _a.dataProvider, dispatch = _a.dispatch, logoutIfAccessDenied = _a.logoutIfAccessDenied, allArguments = _a.allArguments;
    dispatch(undoActions_1.startOptimisticMode());
    if (window) {
        window.addEventListener('beforeunload', warnBeforeClosingWindow, {
            capture: true,
        });
    }
    dispatch({
        type: action,
        payload: payload,
        meta: __assign({ resource: resource }, rest),
    });
    dispatch({
        type: action + "_OPTIMISTIC",
        payload: payload,
        meta: {
            resource: resource,
            fetch: getFetchType_1.default(type),
            optimistic: true,
        },
    });
    onSuccess && onSuccess({});
    undoableEventEmitter_1.default.once('end', function (_a) {
        var isUndo = _a.isUndo;
        dispatch(undoActions_1.stopOptimisticMode());
        if (isUndo) {
            dispatch(notificationActions_1.showNotification('ra.notification.canceled'));
            dispatch(uiActions_1.refreshView());
            if (window) {
                window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
                    capture: true,
                });
            }
            return;
        }
        dispatch({
            type: action + "_LOADING",
            payload: payload,
            meta: __assign({ resource: resource }, rest),
        });
        dispatch({ type: fetchActions_1.FETCH_START });
        try {
            dataProvider[type]
                .apply(dataProvider, typeof resource !== 'undefined'
                ? [resource, payload]
                : allArguments)
                .then(function (response) {
                if (process.env.NODE_ENV !== 'production') {
                    validateResponseFormat_1.default(response, type);
                }
                dispatch({
                    type: action + "_SUCCESS",
                    payload: response,
                    requestPayload: payload,
                    meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_END }),
                });
                dispatch({ type: fetchActions_1.FETCH_END });
                if (window) {
                    window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
                        capture: true,
                    });
                }
                stackedCalls_1.replayStackedCalls();
            })
                .catch(function (error) {
                if (window) {
                    window.removeEventListener('beforeunload', warnBeforeClosingWindow, {
                        capture: true,
                    });
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                return logoutIfAccessDenied(error).then(function (loggedOut) {
                    if (loggedOut)
                        return;
                    dispatch({
                        type: action + "_FAILURE",
                        error: error.message ? error.message : error,
                        payload: error.body ? error.body : null,
                        requestPayload: payload,
                        meta: __assign(__assign({}, rest), { resource: resource, fetchResponse: getFetchType_1.default(type), fetchStatus: fetchActions_1.FETCH_ERROR }),
                    });
                    dispatch({ type: fetchActions_1.FETCH_ERROR, error: error });
                    onFailure && onFailure(error);
                });
            });
        }
        catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(e);
            }
            throw new Error('The dataProvider threw an error. It should return a rejected Promise instead.');
        }
    });
    return Promise.resolve({});
};
exports.performUndoableQuery = performUndoableQuery;
// event listener added as window.onbeforeunload when starting optimistic mode, and removed when it ends
var warnBeforeClosingWindow = function (event) {
    event.preventDefault(); // standard
    event.returnValue = ''; // Chrome
    return 'Your latest modifications are not yet sent to the server. Are you sure?'; // Old IE
};
