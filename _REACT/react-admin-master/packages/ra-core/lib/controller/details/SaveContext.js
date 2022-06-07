"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePickSaveContext = exports.useSaveContext = exports.SaveContextProvider = exports.SaveContext = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var pick_1 = __importDefault(require("lodash/pick"));
exports.SaveContext = react_1.createContext(undefined);
var SaveContextProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return (React.createElement(exports.SaveContext.Provider, { value: value }, children));
};
exports.SaveContextProvider = SaveContextProvider;
/**
 * Get the save() function and its status
 *
 * Used in forms.
 *
 * @example
 *
 * const {
 *     save,
 *     saving
 * } = useSaveContext();
 */
var useSaveContext = function (props) {
    var context = react_1.useContext(exports.SaveContext);
    if (!context || !context.save || !context.setOnFailure) {
        /**
         * The element isn't inside a <SaveContextProvider>
         * To avoid breakage in that case, fallback to props
         *
         * @deprecated - to be removed in 4.0
         */
        if (process.env.NODE_ENV !== 'production') {
            console.log("Edit or Create child components must be used inside a <SaveContextProvider>. Relying on props rather than context to get persistence related data and callbacks is deprecated and won't be supported in the next major version of react-admin.");
        }
        return props;
    }
    return context;
};
exports.useSaveContext = useSaveContext;
var usePickSaveContext = function (context) {
    var value = react_1.useMemo(function () {
        return pick_1.default(context, [
            'save',
            'saving',
            'setOnFailure',
            'setOnSuccess',
            'setTransform',
            'onSuccessRef',
            'onFailureRef',
            'transformRef',
        ]);
    }, 
    /* eslint-disable react-hooks/exhaustive-deps */
    [
        context.save,
        context.saving,
        context.setOnFailure,
        context.setOnSuccess,
        context.setTransform,
        context.setTransform,
        context.onFailureRef,
        context.onSuccessRef,
        context.transformRef,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
    );
    return value;
};
exports.usePickSaveContext = usePickSaveContext;
