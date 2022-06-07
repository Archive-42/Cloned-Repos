"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var util_1 = require("../util");
var defaultSelection = [];
/**
 * Hooks to provide selection state.
 *
 * The names of the return values match the ListContext interface
 *
 * @example
 *
 * const { selectedIds, onSelect, onToggleItem, onUnselectItems } = useSelectionState();
 *
 */
var useSelectionState = function (initialSelection) {
    if (initialSelection === void 0) { initialSelection = defaultSelection; }
    var _a = util_1.useSafeSetState(initialSelection), selectedIds = _a[0], setSelectedIds = _a[1];
    var isFirstRender = react_1.useRef(true);
    react_1.useEffect(function () {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setSelectedIds(initialSelection);
    }, [initialSelection, setSelectedIds]);
    var onSelect = react_1.useCallback(function (newIds) {
        setSelectedIds(newIds);
    }, [setSelectedIds]);
    var onToggleItem = react_1.useCallback(function (id) {
        setSelectedIds(function (previousState) {
            var index = previousState.indexOf(id);
            if (index > -1) {
                return __spreadArrays(previousState.slice(0, index), previousState.slice(index + 1));
            }
            else {
                return __spreadArrays(previousState, [id]);
            }
        });
    }, [setSelectedIds]);
    var onUnselectItems = react_1.useCallback(function () {
        setSelectedIds([]);
    }, [setSelectedIds]);
    return {
        selectedIds: selectedIds,
        onSelect: onSelect,
        onToggleItem: onToggleItem,
        onUnselectItems: onUnselectItems,
    };
};
exports.default = useSelectionState;
