"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAutomaticRefresh = exports.SET_AUTOMATIC_REFRESH = exports.refreshView = exports.REFRESH_VIEW = exports.setSidebarVisibility = exports.SET_SIDEBAR_VISIBILITY = exports.toggleSidebar = exports.TOGGLE_SIDEBAR = void 0;
exports.TOGGLE_SIDEBAR = 'RA/TOGGLE_SIDEBAR';
var toggleSidebar = function () { return ({
    type: exports.TOGGLE_SIDEBAR,
}); };
exports.toggleSidebar = toggleSidebar;
exports.SET_SIDEBAR_VISIBILITY = 'RA/SET_SIDEBAR_VISIBILITY';
var setSidebarVisibility = function (isOpen) { return ({
    type: exports.SET_SIDEBAR_VISIBILITY,
    payload: isOpen,
}); };
exports.setSidebarVisibility = setSidebarVisibility;
exports.REFRESH_VIEW = 'RA/REFRESH_VIEW';
var refreshView = function () { return ({
    type: exports.REFRESH_VIEW,
}); };
exports.refreshView = refreshView;
exports.SET_AUTOMATIC_REFRESH = 'RA/SET_AUTOMATIC_REFRESH';
var setAutomaticRefresh = function (enabled) { return ({
    type: exports.SET_AUTOMATIC_REFRESH,
    payload: enabled,
}); };
exports.setAutomaticRefresh = setAutomaticRefresh;
