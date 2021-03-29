"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandler = exports.getRootPath = void 0;
const vscode = require("vscode");
const path_1 = require("path");
// @ts-ignore
const commondir = require("commondir");
function getRootPath() {
    var _a;
    const absolutePathsOfWorkspaceFolders = ((_a = vscode.workspace.workspaceFolders) === null || _a === void 0 ? void 0 : _a.map((workspaceFolder) => workspaceFolder.uri.fsPath)) || [];
    if (absolutePathsOfWorkspaceFolders.length === 0) {
        return;
    }
    return absolutePathsOfWorkspaceFolders.length > 0
        ? path_1.normalize(commondir(absolutePathsOfWorkspaceFolders))
        : undefined;
}
exports.getRootPath = getRootPath;
function withErrorHandler(errorHandler) {
    return (fn) => (...args) => {
        try {
            return fn(...args);
        }
        catch (error) {
            errorHandler(error);
        }
    };
}
exports.withErrorHandler = withErrorHandler;
//# sourceMappingURL=utils.js.map