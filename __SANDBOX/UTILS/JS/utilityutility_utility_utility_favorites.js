"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty = exports.normalize = exports.merge = void 0;
/** Merges directory trees. Does not eliminate duplicate items. */
function merge(nodes) {
    const normalized = nodes.map(normalize);
    const directories = {};
    for (const node of normalized)
        for (let name in node.directories) {
            if (name in directories === false)
                directories[name] = [];
            directories[name].push(node.directories[name]);
        }
    return {
        directories: Object.fromEntries(Object.entries(directories).map(([name, subDirs]) => [
            name,
            merge(subDirs),
        ])),
        items: normalized.flatMap(n => n.items),
    };
}
exports.merge = merge;
/**
 * Sets properties to empty objects if necessary.
 * @param node Node to normalize.
 */
function normalize(node) {
    if (node.directories === undefined)
        node.directories = {};
    if (node.items === undefined)
        node.items = [];
    return node;
}
exports.normalize = normalize;
/**
 * Checks whether a favorites node is empty.
 * @param node Node to check.
 * @param recursive
 *     Whether directories are checked recursively.
 *     If not an empty folder qualifies as not empty.
 */
function empty(node, recursive = true) {
    if (node.directories !== undefined &&
        (recursive ?
            Object.values(node.directories).some(d => empty(d, recursive) === false) :
            Object.keys(node.directories).length > 0))
        return false;
    if (node.items !== undefined &&
        node.items.length > 0)
        return false;
    return true;
}
exports.empty = empty;
//# sourceMappingURL=favorites.js.map