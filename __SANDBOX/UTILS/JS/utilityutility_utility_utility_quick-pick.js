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
exports.unicodeEntryToQuickPick = exports.showPaginatedQuickPick = void 0;
const vscode_1 = require("vscode");
const code_conversion_1 = require("./code-conversion");
function showPaginatedQuickPick(items, options, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const resolvedItems = yield items;
        const defaults = { pageSize: 100 };
        options = Object.assign(Object.assign({}, defaults), options);
        const showPage = (page) => __awaiter(this, void 0, void 0, function* () {
            const pageSize = options.pageSize;
            const pageItems = resolvedItems.slice(page * pageSize, (page + 1) * pageSize);
            const resultsString = (offset) => {
                const start = (page + offset) * pageSize + 1;
                const end = Math.min((page + 1 + offset) * pageSize, resolvedItems.length);
                return `Results ${start} - ${end} of ${resolvedItems.length}`;
            };
            const previousPageItem = {
                label: "[Previous Page]",
                description: resultsString(-1),
                _callback: () => showPage(page - 1)
            };
            const nextPageItem = {
                label: "[Next Page]",
                description: resultsString(+1),
                _callback: () => showPage(page + 1)
            };
            if (page > 0)
                pageItems.unshift(previousPageItem);
            if ((page + 1) * pageSize < resolvedItems.length)
                pageItems.push(nextPageItem);
            const selection = yield vscode_1.window.showQuickPick(pageItems, options, token);
            // Paging item selected
            if (selection && '_callback' in selection)
                return yield selection._callback();
            else
                return selection;
        });
        return yield showPage(0);
    });
}
exports.showPaginatedQuickPick = showPaginatedQuickPick;
/**
 * Maps an entry to a `QuickPickItem`.
 * - `description` contains the hex code and name.
 * - `detail` contains aliases if there are any.
 * @param entry The entry to map.
 */
function unicodeEntryToQuickPick(entry) {
    return {
        label: entry.codes.map(code => String.fromCodePoint(code)).join(''),
        description: `${code_conversion_1.codesToHex(entry.codes)} - ${entry.name}`,
        detail: entry.aliases.length === 0 ? undefined : entry.aliases.join(', '),
        entry
    };
}
exports.unicodeEntryToQuickPick = unicodeEntryToQuickPick;
//# sourceMappingURL=quick-pick.js.map