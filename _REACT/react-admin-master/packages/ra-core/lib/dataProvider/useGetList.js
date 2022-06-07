"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var get_1 = __importDefault(require("lodash/get"));
var useQueryWithStore_1 = __importDefault(require("./useQueryWithStore"));
var defaultIds = [];
var defaultData = {};
/**
 * Call the dataProvider.getList() method and return the resolved result
 * as well as the loading state.
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
 * import { useGetList } from 'react-admin';
 *
 * const LatestNews = () => {
 *     const { data, ids, loading, error } = useGetList(
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
var useGetList = function (resource, pagination, sort, filter, options) {
    var requestSignature = JSON.stringify({ pagination: pagination, sort: sort, filter: filter });
    var _a = useQueryWithStore_1.default({ type: 'getList', resource: resource, payload: { pagination: pagination, sort: sort, filter: filter } }, options, 
    // ids and data selector
    function (state) { return ({
        ids: get_1.default(state.admin.resources, [resource, 'list', 'cachedRequests', requestSignature, 'ids'], null),
        allRecords: get_1.default(state.admin.resources, [resource, 'data'], defaultData),
    }); }, 
    // total selector (may return undefined)
    function (state) {
        return get_1.default(state.admin.resources, [
            resource,
            'list',
            'cachedRequests',
            requestSignature,
            'total',
        ]);
    }, isDataLoaded), _b = _a.data, ids = _b.ids, allRecords = _b.allRecords, total = _a.total, error = _a.error, loading = _a.loading, loaded = _a.loaded;
    var data = react_1.useMemo(function () {
        return ids === null
            ? defaultData
            : ids
                .map(function (id) { return allRecords[id]; })
                .reduce(function (acc, record) {
                if (!record)
                    return acc;
                acc[record.id] = record;
                return acc;
            }, {});
    }, [ids, allRecords]);
    return {
        data: data,
        ids: ids === null ? defaultIds : ids,
        total: total,
        error: error,
        loading: loading,
        loaded: loaded,
    };
};
var isDataLoaded = function (data) { return data.ids !== null; };
exports.default = useGetList;
