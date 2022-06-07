"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReferenceInputController = void 0;
var react_1 = require("react");
var useGetList_1 = __importDefault(require("../../dataProvider/useGetList"));
var referenceDataStatus_1 = require("./referenceDataStatus");
var useTranslate_1 = __importDefault(require("../../i18n/useTranslate"));
var useReference_1 = __importDefault(require("../useReference"));
var usePaginationState_1 = __importDefault(require("../usePaginationState"));
var __1 = require("..");
var useFilterState_1 = __importDefault(require("../useFilterState"));
var useSelectionState_1 = __importDefault(require("../useSelectionState"));
var core_1 = require("../../core");
var defaultReferenceSource = function (resource, source) {
    return resource + "@" + source;
};
var defaultFilter = {};
/**
 * A hook for choosing a reference record. Useful for foreign keys.
 *
 * This hook fetches the possible values in the reference resource
 * (using `dataProvider.getList()`), it returns the possible choices
 * as the `choices` attribute.
 *
 * @example
 * const {
 *      choices, // the available reference resource
 * } = useReferenceInputController({
 *      input, // the input props
 *      resource: 'comments',
 *      reference: 'posts',
 *      source: 'post_id',
 * });
 *
 * The hook also allow to filter results. It returns a `setFilter`
 * function. It uses the value to create a filter
 * for the query - by default { q: [searchText] }. You can customize the mapping
 * searchText => searchQuery by setting a custom `filterToQuery` function option
 * You can also add a permanentFilter to further filter the result:
 *
 * @example
 * const {
 *      choices, // the available reference resource
 *      setFilter,
 * } = useReferenceInputController({
 *      input, // the input props
 *      resource: 'comments',
 *      reference: 'posts',
 *      source: 'post_id',
 *      permanentFilter: {
 *          author: 'john'
 *      },
 *      filterToQuery: searchText => ({ title: searchText })
 * });
 */
var useReferenceInputController = function (props) {
    var _a;
    var basePath = props.basePath, input = props.input, _b = props.page, initialPage = _b === void 0 ? 1 : _b, _c = props.perPage, initialPerPage = _c === void 0 ? 25 : _c, _d = props.filter, filter = _d === void 0 ? defaultFilter : _d, reference = props.reference, filterToQuery = props.filterToQuery, sortOverride = props.sort;
    var resource = core_1.useResourceContext(props);
    var translate = useTranslate_1.default();
    // pagination logic
    var _e = usePaginationState_1.default({ page: initialPage, perPage: initialPerPage }), pagination = _e.pagination, setPagination = _e.setPagination, page = _e.page, setPage = _e.setPage, perPage = _e.perPage, setPerPage = _e.setPerPage;
    // sort logic
    var _f = __1.useSortState(sortOverride), sort = _f.sort, setSortObject = _f.setSort;
    var setSort = react_1.useCallback(function (field, order) {
        if (order === void 0) { order = 'ASC'; }
        setSortObject({ field: field, order: order });
        setPage(1);
    }, [setPage, setSortObject]);
    // filter logic
    var _g = useFilterState_1.default({
        permanentFilter: filter,
        filterToQuery: filterToQuery,
    }), filterValues = _g.filter, setFilter = _g.setFilter;
    var displayedFilters = [];
    // plus showFilter and hideFilter defined outside of the hook because
    // they never change
    // selection logic
    var _h = useSelectionState_1.default(), selectedIds = _h.selectedIds, onSelect = _h.onSelect, onToggleItem = _h.onToggleItem, onUnselectItems = _h.onUnselectItems;
    // fetch possible values
    var _j = useGetList_1.default(reference, pagination, sort, filterValues), possibleValuesIds = _j.ids, possibleValuesData = _j.data, possibleValuesTotal = _j.total, possibleValuesLoaded = _j.loaded, possibleValuesLoading = _j.loading, possibleValuesError = _j.error;
    // fetch current value
    var _k = useReference_1.default({
        id: input.value,
        reference: reference,
    }), referenceRecord = _k.referenceRecord, referenceError = _k.error, referenceLoading = _k.loading, referenceLoaded = _k.loaded;
    // add current value to possible sources
    var finalIds, finalData, finalTotal;
    if (!referenceRecord || possibleValuesIds.includes(input.value)) {
        finalIds = possibleValuesIds;
        finalData = possibleValuesData;
        finalTotal = possibleValuesTotal;
    }
    else {
        finalIds = __spreadArrays([input.value], possibleValuesIds);
        finalData = __assign((_a = {}, _a[input.value] = referenceRecord, _a), possibleValuesData);
        finalTotal += 1;
    }
    // overall status
    var dataStatus = referenceDataStatus_1.getStatusForInput({
        input: input,
        matchingReferences: Object.keys(finalData).map(function (id) { return finalData[id]; }),
        referenceRecord: referenceRecord,
        translate: translate,
    });
    return {
        // should match the ListContext shape
        possibleValues: {
            basePath: basePath,
            data: finalData,
            ids: finalIds,
            total: finalTotal,
            error: possibleValuesError,
            loaded: possibleValuesLoaded,
            loading: possibleValuesLoading,
            hasCreate: false,
            page: page,
            setPage: setPage,
            perPage: perPage,
            setPerPage: setPerPage,
            currentSort: sort,
            setSort: setSort,
            filterValues: filterValues,
            displayedFilters: displayedFilters,
            setFilters: setFilter,
            showFilter: showFilter,
            hideFilter: hideFilter,
            selectedIds: selectedIds,
            onSelect: onSelect,
            onToggleItem: onToggleItem,
            onUnselectItems: onUnselectItems,
            resource: resource,
        },
        referenceRecord: {
            data: referenceRecord,
            loaded: referenceLoaded,
            loading: referenceLoading,
            error: referenceError,
        },
        dataStatus: {
            error: dataStatus.error,
            loading: dataStatus.waiting,
            warning: dataStatus.warning,
        },
        choices: finalIds.map(function (id) { return finalData[id]; }),
        // kept for backwards compatibility
        // @deprecated to be removed in 4.0
        error: dataStatus.error,
        loading: possibleValuesLoading || referenceLoading,
        loaded: possibleValuesLoaded && referenceLoaded,
        filter: filterValues,
        setFilter: setFilter,
        pagination: pagination,
        setPagination: setPagination,
        sort: sort,
        setSort: setSortObject,
        warning: dataStatus.warning,
    };
};
exports.useReferenceInputController = useReferenceInputController;
var hideFilter = function () { };
var showFilter = function () { };
