import { OnSuccess, OnFailure } from '../types';
import { DeclarativeSideEffect } from './useDeclarativeSideEffects';
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
declare const useQuery: (query: Query, options?: QueryOptions) => UseQueryValue;
export interface Query {
    type: string;
    resource?: string;
    payload: object;
}
export interface QueryOptions {
    action?: string;
    onSuccess?: OnSuccess | DeclarativeSideEffect;
    onFailure?: OnFailure | DeclarativeSideEffect;
    withDeclarativeSideEffectsSupport?: boolean;
}
export declare type UseQueryValue = {
    data?: any;
    total?: number;
    error?: any;
    loading: boolean;
    loaded: boolean;
};
export default useQuery;
