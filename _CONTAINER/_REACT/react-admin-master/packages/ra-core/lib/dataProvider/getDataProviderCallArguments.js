"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataProviderCallArguments = void 0;
// List of properties we expect in the options
var OptionsProperties = [
    'action',
    'fetch',
    'meta',
    'onFailure',
    'onSuccess',
    'undoable',
    'mutationMode',
];
var isDataProviderOptions = function (value) {
    if (typeof value === 'undefined')
        return [];
    var options = value;
    return Object.keys(options).some(function (key) { return OptionsProperties.includes(key); });
};
// As all dataProvider methods do not have the same signature, we must differentiate
// standard methods which have the (resource, params, options) signature
// from the custom ones
var getDataProviderCallArguments = function (args) {
    var lastArg = args[args.length - 1];
    var allArguments = __spreadArrays(args);
    var resource;
    var payload;
    var options;
    if (isDataProviderOptions(lastArg)) {
        options = lastArg;
        allArguments = allArguments.slice(0, args.length - 1);
    }
    if (typeof allArguments[0] === 'string') {
        resource = allArguments[0];
        payload = allArguments[1];
    }
    return {
        resource: resource,
        payload: payload,
        allArguments: allArguments,
        options: options,
    };
};
exports.getDataProviderCallArguments = getDataProviderCallArguments;
