"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateContext = void 0;
var react_1 = require("react");
var merge_1 = __importDefault(require("lodash/merge"));
var CreateContext_1 = require("./CreateContext");
/**
 * Hook to read the create controller props from the CreateContext.
 *
 * Mostly used within a <CreateContext.Provider> (e.g. as a descendent of <Create>).
 *
 * But you can also use it without a <CreateContext.Provider>. In this case, it is up to you
 * to pass all the necessary props.
 *
 * The given props will take precedence over context values.
 *
 * @typedef {Object} CreateControllerProps
 *
 * @returns {CreateControllerProps} create controller props
 *
 * @see useCreateController for how it is filled
 *
 */
var useCreateContext = function (props) {
    var context = react_1.useContext(
    // Can't find a way to specify the RecordType when CreateContext is declared
    // @ts-ignore
    CreateContext_1.CreateContext);
    // Props take precedence over the context
    return react_1.useMemo(function () {
        return merge_1.default({}, context, props != null ? extractCreateContextProps(props) : {});
    }, [context, props]);
};
exports.useCreateContext = useCreateContext;
/**
 * Extract only the create controller props
 *
 * @param {Object} props props passed to the useCreateContext hook
 *
 * @returns {CreateControllerProps} create controller props
 */
var extractCreateContextProps = function (_a) {
    var basePath = _a.basePath, record = _a.record, defaultTitle = _a.defaultTitle, onFailureRef = _a.onFailureRef, onSuccessRef = _a.onSuccessRef, transformRef = _a.transformRef, loaded = _a.loaded, loading = _a.loading, redirect = _a.redirect, setOnFailure = _a.setOnFailure, setOnSuccess = _a.setOnSuccess, setTransform = _a.setTransform, resource = _a.resource, save = _a.save, saving = _a.saving, successMessage = _a.successMessage, version = _a.version;
    return ({
        basePath: basePath,
        record: record,
        defaultTitle: defaultTitle,
        onFailureRef: onFailureRef,
        onSuccessRef: onSuccessRef,
        transformRef: transformRef,
        loaded: loaded,
        loading: loading,
        redirect: redirect,
        setOnFailure: setOnFailure,
        setOnSuccess: setOnSuccess,
        setTransform: setTransform,
        resource: resource,
        save: save,
        saving: saving,
        successMessage: successMessage,
        version: version,
    });
};
