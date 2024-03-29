"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ListFilterContext_1 = __importDefault(require("./ListFilterContext"));
/**
 * Hook to read the list controller props from the ListContext.
 *
 * Must be used within a <ListContextProvider> (e.g. as a descendent of <List>
 * or <ListBase>).
 *
 * @typedef {Object} ListFilterContextValue
 * @prop {Object}   filterValues a dictionary of filter values, e.g. { title: 'lorem', nationality: 'fr' }
 * @prop {Function} setFilters a callback to update the filters, e.g. setFilters(filters, displayedFilters)
 * @prop {Object}   displayedFilters a dictionary of the displayed filters, e.g. { title: true, nationality: true }
 * @prop {Function} showFilter a callback to show one of the filters, e.g. showFilter('title', defaultValue)
 * @prop {Function} hideFilter a callback to hide one of the filters, e.g. hideFilter('title')
 * @prop {string}   resource the resource name, deduced from the location. e.g. 'posts'
 *
 * @returns {ListFilterContextValue} list controller props
 *
 * @see useListController for how it is filled
 */
var useListFilterContext = function (props) {
    var context = react_1.useContext(ListFilterContext_1.default);
    if (!context.hideFilter) {
        /**
         * The element isn't inside a <ListFilterContext.Provider>
         *
         * This may only happen when using Datagrid / SimpleList / SingleFieldList components
         * outside of a List / ReferenceManyField / ReferenceArrayField -
         * which isn't documented but tolerated.
         * To avoid breakage in that case, fallback to props
         *
         * @deprecated - to be removed in 4.0
         */
        if (process.env.NODE_ENV !== 'production') {
            console.log("List components must be used inside a <ListContextProvider>. Relying on props rather than context to get List data and callbacks is deprecated and won't be supported in the next major version of react-admin.");
        }
        return props;
    }
    return context;
};
exports.default = useListFilterContext;
