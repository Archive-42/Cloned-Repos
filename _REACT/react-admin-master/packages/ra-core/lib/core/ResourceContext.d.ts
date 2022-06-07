/// <reference types="react" />
/**
 * Context to store the current resource information.
 *
 * Use the useResource() hook to read the context. That's what most components do in react-admin.
 *
 * @example
 *
 * import { useResource, useTranslate } from 'ra-core';
 *
 * const MyCustomEditTitle = props => {
 *     const name = useResource(props);
 *
 *     return (
 *         <h1>{translate(`${name}.name`)}</h1>
 *     );
 * };
 */
export declare const ResourceContext: import("react").Context<string>;
export declare type ResourceContextValue = string;
