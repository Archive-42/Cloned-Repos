"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathResolve = exports.hasRoot = exports.isMultiRoots = exports.getSingleRootPath = void 0;
const vscode = require("vscode");
const path = require("path");
function getSingleRootPath() {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
}
exports.getSingleRootPath = getSingleRootPath;
function isMultiRoots() {
    return vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 1;
}
exports.isMultiRoots = isMultiRoots;
function hasRoot() {
    return vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0;
}
exports.hasRoot = hasRoot;
function pathResolve(filePath) {
    if (isMultiRoots() || !hasRoot()) {
        return filePath;
    }
    return path.resolve(vscode.workspace.workspaceFolders[0].uri.fsPath, filePath);
}
exports.pathResolve = pathResolve;

//# sourceMappingURL=util.js.map
