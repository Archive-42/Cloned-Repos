import { Identifier } from '../types';
declare type RedirectToFunction = (basePath: string, id: Identifier, data: any) => string;
export declare type RedirectionSideEffect = string | boolean | RedirectToFunction;
interface ActionWithSideEffect {
    type: string;
    payload?: {
        id?: string | number;
        data?: {
            id?: string | number;
        };
    };
    requestPayload?: {
        id?: string | number;
        data?: {
            id?: string | number;
        };
    };
    meta: {
        redirectTo: RedirectionSideEffect;
        basePath?: string;
    };
}
/**
 * Redirection Side Effects
 */
export declare function handleRedirection({ payload, requestPayload, meta: { basePath, redirectTo }, }: ActionWithSideEffect): Generator<any, void, unknown>;
export default function (): Generator<any, void, unknown>;
export {};
