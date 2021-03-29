'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const lodashSortBy = require('lodash.sortby');
const copyPaste = require('copy-paste');
function getCursors(editBuilder) {
    const editor = vscode.window.activeTextEditor;
    const { document, selections } = editor;
    return lodashSortBy(selections, ['start.line', 'start.character']);
}
exports.getCursors = getCursors;
function getClipboardLines() {
    return new Promise(function (resolve) {
        copyPaste.paste(function (err, val) {
            if (typeof val !== 'string') {
                resolve([]);
            }
            else {
                resolve(val.replace('\r\n', '\n').split('\n'));
            }
        });
    });
}
exports.getClipboardLines = getClipboardLines;
//# sourceMappingURL=utils.js.map