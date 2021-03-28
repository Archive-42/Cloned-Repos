"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditContext = void 0;
var react_1 = require("react");
var merge_1 = __importDefault(require("lodash/merge"));
var EditContext_1 = require("./EditContext");
/**
 * Hook to read the edit controller props from the CreateContext.
 *
 * Mostly used within a <EditContext.Provider> (e.g. as a descendent of <Edit>).
 *
 * But you can also use it without a <EditContext.Provider>. In this case, it is up to you
 * to pass all the necessary props.
 *
 * The given props will take precedence over context values.
 *
 * @typedef {Object} EditControllerProps
 *
 * @returns {EditControllerProps} edit controller props
 *
 * @see useEditController for how it is filled
 *
 */
var useEditContext = function (props) {
    // Can't find a way to specify the RecordType when EditContext is declared
    // @ts-ignore
    var context = react_1.useContext(EditContext_1.EditContext);
    // Props take precedence over the context
    return react_1.useMemo(function () {
        return merge_1.default({}, context, props != null ? extractEditContextProps(props) : {});
    }, [context, props]);
};
exports.useEditContext = useEditContext;
/**
 * Extract only the edit controller props
 *
 * @param {Object} props props passed to the useEditContext hook
 *
 * @returns {EditControllerProps} edit controller props
 */
var extractEditContextProps = function (_a) {
    var basePath = _a.basePath, data = _a.data, record = _a.record, defaultTitle = _a.defaultTitle, onFailureRef = _a.onFailureRef, onSuccessRef = _a.onSuccessRef, transformRef = _a.transformRef, loaded = _a.loaded, loading = _a.loading, redirect = _a.redirect, setOnFailure = _a.setOnFailure, setOnSuccess = _a.setOnSuccess, setTransform = _a.setTransform, resource = _a.resource, save = _a.save, saving = _a.saving, successMessage = _a.successMessage, version = _a.version;
    return ({
        basePath: basePath,
        // Necessary for actions (EditActions) which expect a data prop containing the record
        // @deprecated - to be removed in 4.0d
        data: record || data,
        record: record || data,
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
