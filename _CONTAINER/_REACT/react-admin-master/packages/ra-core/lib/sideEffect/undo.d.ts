export declare function handleUndoRace(undoableAction: {
    payload: {
        action: any;
    };
}): Generator<any, void, {
    complete: any;
}>;
export default function watchUndoable(): Generator<any, void, unknown>;
