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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var hooks_1 = require("../util/hooks");
var useDataProvider_1 = __importDefault(require("./useDataProvider"));
var useDataProviderWithDeclarativeSideEffects_1 = __importDefault(require("./useDataProviderWithDeclarativeSideEffects"));
var useVersion_1 = __importDefault(require("../controller/useVersion"));
/**
 * Call the data provider on mount
 *
 * The return value updates according to the request state:
 *
 * - start: { loading: true, loaded: false }
 * - success: { data: [data from response], total: [total from response], loading: false, loaded: true }
 * - error: { error: [error from response], loading: false, loaded: true }
 *
 * @param {Object} query
 * @param {string} query.type The method called on the data provider, e.g. 'getList', 'getOne'. Can also be a custom method if the dataProvider supports is.
 * @param {string} query.resource A resource name, e.g. 'posts', 'comments'
 * @param {Object} query.payload The payload object, e.g; { post_id: 12 }
 * @param {Object} options
 * @param {string} options.action Redux action type
 * @param {Function} options.onSuccess Side effect function to be executed upon success, e.g. () => refresh()
 * @param {Function} options.onFailure Side effect function to be executed upon failure, e.g. (error) => notify(error.message)
 * @param {boolean} options.withDeclarativeSideEffectsSupport Set to true to support legacy side effects e.g. { onSuccess: { refresh: true } }
 *
 * @returns The current request state. Destructure as { data, total, error, loading, loaded }.
 *
 * @example
 *
 * import { useQuery } from 'react-admin';
 *
 * const UserProfile = ({ record }) => {
 *     const { data, loading, error } = useQuery({
 *         type: 'getOne',
 *         resource: 'users',
 *         payload: { id: record.id }
 *     });
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return <div>User {data.username}</div>;
 * };
 *
 * @example
 *
 * import { useQuery } from 'react-admin';
 *
 * const payload = {
 *    pagination: { page: 1, perPage: 10 },
 *    sort: { field: 'username', order: 'ASC' },
 * };
 * const UserList = () => {
 *     const { data, total, loading, error } = useQuery({
 *         type: 'getList',
 *         resource: 'users',
 *         payload
 *     });
 *     if (loading) { return <Loading />; }
 *     if (error) { return <p>ERROR</p>; }
 *     return (
 *         <div>
 *             <p>Total users: {total}</p>
 *             <ul>
 *                 {data.map(user => <li key={user.username}>{user.username}</li>)}
 *             </ul>
 *         </div>
 *     );
 * };
 */
var useQuery = function (query, options) {
    if (options === void 0) { options = { onSuccess: undefined }; }
    var type = query.type, resource = query.resource, payload = query.payload;
    var withDeclarativeSideEffectsSupport = options.withDeclarativeSideEffectsSupport, otherOptions = __rest(options, ["withDeclarativeSideEffectsSupport"]);
    var version = useVersion_1.default(); // used to allow force reload
    var requestSignature = JSON.stringify({
        query: query,
        options: otherOptions,
        version: version,
    });
    var _a = hooks_1.useSafeSetState({
        data: undefined,
        error: null,
        total: null,
        loading: true,
        loaded: false,
    }), state = _a[0], setState = _a[1];
    var dataProvider = useDataProvider_1.default();
    var dataProviderWithDeclarativeSideEffects = useDataProviderWithDeclarativeSideEffects_1.default();
    /* eslint-disable react-hooks/exhaustive-deps */
    react_1.useEffect(function () {
        /**
         * Support legacy side effects, e.g. { onSuccess: { refresh: true, unSelectAll: true }}
         *
         * @deprecated to be removed in 4.0
         */
        var finalDataProvider = withDeclarativeSideEffectsSupport
            ? dataProviderWithDeclarativeSideEffects
            : dataProvider;
        setState(function (prevState) { return (__assign(__assign({}, prevState), { loading: true })); });
        finalDataProvider[type]
            .apply(finalDataProvider, typeof resource !== 'undefined'
            ? [resource, payload, otherOptions]
            : [payload, otherOptions])
            .then(function (_a) {
            var data = _a.data, total = _a.total;
            setState({
                data: data,
                total: total,
                loading: false,
                loaded: true,
            });
        })
            .catch(function (error) {
            setState({
                error: error,
                loading: false,
                loaded: false,
            });
        });
    }, [
        requestSignature,
        dataProvider,
        dataProviderWithDeclarativeSideEffects,
        setState,
    ]);
    /* eslint-enable react-hooks/exhaustive-deps */
    return state;
};
exports.default = useQuery;
