"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showMessageDialog = exports.showConfirmDialog = void 0;
// @ts-ignore
const dialog_svelte_1 = require("../components/dialog.svelte");
/**
 * Shows a confirmation dialog.
 * Resolves to `true` on OK and `false` on Cancel.
 * @param content The dialog text content.
 */
function showConfirmDialog(content) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(res => {
            const dialog = new dialog_svelte_1.default({
                target: document.body,
                props: { content },
            });
            let confirmed = false;
            dialog.$on('ok', () => confirmed = true);
            dialog.$on('cancel', () => confirmed = false);
            dialog.$on('closed', () => {
                res(confirmed);
                dialog.$destroy();
            });
        });
    });
}
exports.showConfirmDialog = showConfirmDialog;
/**
 * Shows a message dialog.
 * @param content The dialog text content.
 */
function showMessageDialog(content) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(res => {
            const dialog = new dialog_svelte_1.default({
                target: document.body,
                props: {
                    content,
                    buttons: [{ value: 'ok', label: 'OK' }],
                },
            });
            dialog.$on('closed', () => {
                res();
                dialog.$destroy();
            });
        });
    });
}
exports.showMessageDialog = showMessageDialog;
//# sourceMappingURL=dialog-utility.js.map