"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFilter = exports.CRUD_SET_FILTER = exports.hideFilter = exports.CRUD_HIDE_FILTER = exports.showFilter = exports.CRUD_SHOW_FILTER = void 0;
exports.CRUD_SHOW_FILTER = 'RA/CRUD_SHOW_FILTER';
var showFilter = function (resource, field) { return ({
    type: exports.CRUD_SHOW_FILTER,
    payload: { field: field },
    meta: { resource: resource },
}); };
exports.showFilter = showFilter;
exports.CRUD_HIDE_FILTER = 'RA/CRUD_HIDE_FILTER';
var hideFilter = function (resource, field) { return ({
    type: exports.CRUD_HIDE_FILTER,
    payload: { field: field },
    meta: { resource: resource },
}); };
exports.hideFilter = hideFilter;
exports.CRUD_SET_FILTER = 'RA/CRUD_SET_FILTER';
var setFilter = function (resource, field, value) { return ({
    type: exports.CRUD_SET_FILTER,
    payload: { field: field, value: value },
    meta: { resource: resource },
}); };
exports.setFilter = setFilter;
