export declare const finalizeFactory: (tasks: any, accumulations: any) => (key: any, actionCreator: any) => Generator<any, void, unknown>;
export declare const accumulateFactory: (tasks: any, accumulations: any, finalize: any) => (action: any) => Generator<any, void, any>;
export default function (): Generator<any, void, unknown>;
