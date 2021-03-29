"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const DefaultIndent = "\t";
const Space = " ";
/**
 * If detect Indentation is true,it will use config according to editor.insertSpaces and editor.tabSize.
 * Otherwise it will use tab or space depend on Pretty.Json.useTabs.
 */
function getConfiguration() {
    let indent = DefaultIndent;
    let isTab = true;
    const customConfig = vscode_1.workspace.getConfiguration("Pretty.Json");
    const isDetectIndentation = customConfig.get("detectIndentation");
    const editorConfig = vscode_1.workspace.getConfiguration("editor");
    const isInsertSpaces = editorConfig.get("insertSpaces");
    const tabSize = customConfig.get("indentWidth") || editorConfig.get("tabSize") || 4;
    if (isDetectIndentation) {
        if (isInsertSpaces) {
            isTab = false;
        }
    }
    else {
        isTab = customConfig.get("useTabs");
    }
    if (!isTab) {
        indent = Space.repeat(tabSize);
    }
    return indent;
}
exports.getConfiguration = getConfiguration;
//# sourceMappingURL=util.js.map