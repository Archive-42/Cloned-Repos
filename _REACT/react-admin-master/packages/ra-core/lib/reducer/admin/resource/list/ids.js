"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIds = void 0;
var uniq_1 = __importDefault(require("lodash/uniq"));
var actions_1 = require("../../../../actions");
var core_1 = require("../../../../core");
var initialState = [];
/**
 * List of the ids of the latest loaded page, regardless of params
 *
 * When loading the list for the first time, useListController grabs the ids
 * from the cachedRequests reducer (not this ids reducer). It's only when the user
 * changes page, sort, or filter, that the useListController hook uses the ids
 * reducer, so as to show the previous list of results while loading the new
 * list (instead of displaying a blank page each time the list params change).
 *
 * @see useListController
 *
 */
var idsReducer = function (previousState, action) {
    if (previousState === void 0) { previousState = initialState; }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === core_1.DELETE) {
            var index = previousState
                .map(function (el) { return el === action.payload.id; }) // eslint-disable-line eqeqeq
                .indexOf(true);
            if (index === -1) {
                return previousState;
            }
            return __spreadArrays(previousState.slice(0, index), previousState.slice(index + 1));
        }
        if (action.meta.fetch === core_1.DELETE_MANY) {
            var newState = previousState.filter(function (el) { return !action.payload.ids.includes(el); });
            return newState;
        }
    }
    switch (action.type) {
        case actions_1.CRUD_GET_LIST_SUCCESS:
            return action.payload.data.map(function (_a) {
                var id = _a.id;
                return id;
            });
        case actions_1.CRUD_CREATE_SUCCESS:
            return uniq_1.default(__spreadArrays([action.payload.data.id], previousState));
        default:
            return previousState;
    }
};
exports.default = idsReducer;
var getIds = function (state) { return state; };
exports.getIds = getIds;
