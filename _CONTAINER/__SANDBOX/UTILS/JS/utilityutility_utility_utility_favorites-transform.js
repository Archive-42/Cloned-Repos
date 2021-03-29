"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areFavoritesValid = exports.toSettings = exports.fromSettings = void 0;
/**
 * Transforms a favorites setting into a normalized and
 * more easily manipulated data structure.
 * @param node The settings data.
 */
function fromSettings(node) {
    return {
        directories: node.directories
            ? Object.entries(node.directories)
                .map(([name, value]) => ({
                name,
                content: fromSettings(value),
            }))
            : [],
        items: node.items
            ? node.items.map(codes => ({
                codes: codes.map(c => typeof c === 'string' ? parseInt(c) : c),
            }))
            : [],
        isExpanded: false,
    };
}
exports.fromSettings = fromSettings;
/**
 * Transforms a settings view model to the settings structure.
 * @param node The settings view model.
 */
function toSettings(node) {
    return {
        directories: Object.fromEntries(node.directories.map(d => [
            d.name,
            toSettings(d.content),
        ])),
        items: node.items.map(i => i.codes),
    };
}
exports.toSettings = toSettings;
/**
 * Checks whether favorites view model is valid
 * (i.e. can be converted back to the settings format).
 * @param node Favorites view model.
 */
function areFavoritesValid(node) {
    const names = node.directories.map(d => d.name);
    const locallyValid = names.length === new Set(names).size;
    const recursivelyValid = node
        .directories
        .map(d => areFavoritesValid(d.content))
        .every(x => x);
    return locallyValid && recursivelyValid;
}
exports.areFavoritesValid = areFavoritesValid;
//# sourceMappingURL=favorites-transform.js.map