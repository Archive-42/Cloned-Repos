"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
exports.insert = (editor, value) => editor.edit(builder => editor.selection.isEmpty ?
    builder.insert(editor.selection.active, value) : builder.replace(editor.selection, value));
//# sourceMappingURL=editor.js.map