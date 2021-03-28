"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetMainList = void 0;
var react_1 = require("react");
var get_1 = __importDefault(require("lodash/get"));
var useQueryWithStore_1 = __importDefault(require("./useQueryWithStore"));
var defaultIds = [];
var defaultData = {};
/**
 * Call the dataProvider.getList() method and return the resolved result
 * as well as the loading state.
 *
 * Uses a special cache to avoid showing an empty list while re-fetching the
 * list after changing params.
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from store], ids: [ids from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * This hook will return the cached result when called a second time
 * with the same parameters, until the response arrives.
 *
 * @param {string} resource The resource name, e.g. 'posts'
 * @param {Object} pagination The request pagination { page, perPage }, e.g. { page: 1, perPage: 10 }
 * @param {Object} sort The request sort { field, order }, e.g. { field: 'id', order: 'DESC' }
 * @param {Object} filter The request filters, e.g. { title: 'hello, world' }
 * @param {Object} options Options object to pass to the dataProvider. May include side effects to be executed upon success or failure, e.g. { onSuccess: { refresh: true } }
 *
 * @returns The current request state. Destructure as { data, total, ids, error, loading, loaded }.
 *
 * @example
 *
 * import { useGetMainList } from 'react-admin';
 *
 * const LatestNews = () => {
 *     const { data, ids, loading, error } = useGetMainList(
 *         'posts',
 *         { page: 1, perPage: 10 },
 *         { field: 'published_at', order: 'DESC' }
 *     );
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <ul>{ids.map(id =>
 *         <li key={id}>{data[id].title}</li>
 *     )}</ul>;
 * };
 */
var useGetMainList = function (resource, pagination, sort, filter, options) {
    var requestSignature = JSON.stringify({ pagination: pagination, sort: sort, filter: filter });
    var memo = react_1.useRef({});
    var _a = useQueryWithStore_1.default({ type: 'getList', resource: resource, payload: { pagination: pagination, sort: sort, filter: filter } }, options, 
    // ids and data selector
    function (state) {
        var ids = get_1.default(state.admin.resources, [
            resource,
            'list',
            'cachedRequests',
            requestSignature,
            'ids',
        ]); // default value undefined
        var total = get_1.default(state.admin.resources, [
            resource,
            'list',
            'cachedRequests',
            requestSignature,
            'total',
        ]); // default value undefined
        // When the user changes the page/sort/filter, the list of ids from
        // the cached requests is empty. To avoid rendering an empty list
        // at that moment, we override the ids and total with the latest
        // loaded ones.
        var mainIds = get_1.default(state.admin.resources, [
            resource,
            'list',
            'ids',
        ]); // default value [] (see list.ids reducer)
        // Since the total can be empty during the loading phase
        // We need to override that total with the latest loaded one
        var mainTotal = get_1.default(state.admin.resources, [
            resource,
            'list',
            'total',
        ]); // default value null (see list.total reducer)
        // Is [] for a page that was never loaded
        var finalIds = typeof ids === 'undefined' ? mainIds : ids;
        // Is null for a page that was never loaded.
        var finalTotal = typeof total === 'undefined' ? mainTotal : total;
        var allRecords = get_1.default(state.admin.resources, [resource, 'data'], defaultData);
        // poor man's useMemo inside a hook using a ref
        if (memo.current.finalIds !== finalIds ||
            memo.current.finalTotal !== finalTotal ||
            memo.current.allRecords !== allRecords) {
            var result = {
                finalIds: finalIds,
                finalTotal: finalTotal,
                allRecords: allRecords,
            };
            memo.current = { finalIds: finalIds, finalTotal: finalTotal, allRecords: allRecords, result: result };
        }
        return memo.current.result;
    }, function () { return null; }, isDataLoaded), _b = _a.data, finalIds = _b.finalIds, finalTotal = _b.finalTotal, allRecords = _b.allRecords, error = _a.error, loading = _a.loading, loaded = _a.loaded;
    var data = react_1.useMemo(function () {
        return typeof finalIds === 'undefined'
            ? defaultData
            : finalIds
                .map(function (id) { return allRecords[id]; })
                .reduce(function (acc, record) {
                if (!record)
                    return acc;
                acc[record.id] = record;
                return acc;
            }, {});
    }, [finalIds, allRecords]);
    return {
        data: data,
        ids: typeof finalIds === 'undefined' ? defaultIds : finalIds,
        total: finalTotal,
        error: error,
        loading: loading,
        loaded: loaded,
    };
};
exports.useGetMainList = useGetMainList;
var isDataLoaded = function (data) { return data.finalTotal != null; }; // null or undefined
