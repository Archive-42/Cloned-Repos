import { DataProvider } from '../types';
import { DeclarativeSideEffect } from '../dataProvider/useDeclarativeSideEffects';
interface ActionWithSideEffect {
    type: string;
    payload: any;
    meta: {
        fetch: string;
        resource: string;
        onSuccess?: DeclarativeSideEffect;
        onFailure?: DeclarativeSideEffect;
    };
}
export declare function handleFetch(dataProvider: DataProvider, action: ActionWithSideEffect): Generator<any, void, unknown>;
export declare const takeFetchAction: (action: any) => any;
declare const fetch: (dataProvider: DataProvider) => () => Generator<any, void, unknown>;
export default fetch;
