"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEditController = void 0;
var react_1 = require("react");
var inflection_1 = __importDefault(require("inflection"));
var useVersion_1 = __importDefault(require("../useVersion"));
var checkMinimumRequiredProps_1 = require("../checkMinimumRequiredProps");
var sideEffect_1 = require("../../sideEffect");
var dataProvider_1 = require("../../dataProvider");
var i18n_1 = require("../../i18n");
var actions_1 = require("../../actions");
var saveModifiers_1 = require("../saveModifiers");
var core_1 = require("../../core");
/**
 * Prepare data for the Edit view
 *
 * @param {Object} props The props passed to the Edit component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Edit view
 *
 * @example
 *
 * import { useEditController } from 'react-admin';
 * import EditView from './EditView';
 *
 * const MyEdit = props => {
 *     const controllerProps = useEditController(props);
 *     return <EditView {...controllerProps} {...props} />;
 * }
 */
var useEditController = function (props) {
    checkMinimumRequiredProps_1.useCheckMinimumRequiredProps('Edit', ['basePath', 'resource'], props);
    var basePath = props.basePath, hasCreate = props.hasCreate, hasEdit = props.hasEdit, hasList = props.hasList, hasShow = props.hasShow, id = props.id, successMessage = props.successMessage, 
    // @deprecated use mutationMode: undoable instead
    _a = props.undoable, 
    // @deprecated use mutationMode: undoable instead
    undoable = _a === void 0 ? true : _a, onSuccess = props.onSuccess, onFailure = props.onFailure, _b = props.mutationMode, mutationMode = _b === void 0 ? undoable ? 'undoable' : undefined : _b, transform = props.transform;
    var resource = core_1.useResourceContext(props);
    var translate = i18n_1.useTranslate();
    var notify = sideEffect_1.useNotify();
    var redirect = sideEffect_1.useRedirect();
    var refresh = sideEffect_1.useRefresh();
    var version = useVersion_1.default();
    if (process.env.NODE_ENV !== 'production' && successMessage) {
        console.log('<Edit successMessage> prop is deprecated, use the onSuccess prop instead.');
    }
    var _c = saveModifiers_1.useSaveModifiers({ onSuccess: onSuccess, onFailure: onFailure, transform: transform }), onSuccessRef = _c.onSuccessRef, setOnSuccess = _c.setOnSuccess, onFailureRef = _c.onFailureRef, setOnFailure = _c.setOnFailure, transformRef = _c.transformRef, setTransform = _c.setTransform;
    var _d = dataProvider_1.useGetOne(resource, id, {
        action: actions_1.CRUD_GET_ONE,
        onFailure: function () {
            notify('ra.notification.item_doesnt_exist', 'warning');
            redirect('list', basePath);
            refresh();
        },
    }), record = _d.data, loading = _d.loading, loaded = _d.loaded;
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 1,
        _: inflection_1.default.humanize(inflection_1.default.singularize(resource)),
    });
    var defaultTitle = translate('ra.page.edit', {
        name: "" + resourceName,
        id: id,
        record: record,
    });
    var _e = dataProvider_1.useUpdate(resource, id, {}, // set by the caller
    record), update = _e[0], saving = _e[1].loading;
    var save = react_1.useCallback(function (data, redirectTo, _a) {
        if (redirectTo === void 0) { redirectTo = DefaultRedirect; }
        var _b = _a === void 0 ? {} : _a, onSuccessFromSave = _b.onSuccess, onFailureFromSave = _b.onFailure, transformFromSave = _b.transform;
        return Promise.resolve(transformFromSave
            ? transformFromSave(data)
            : transformRef.current
                ? transformRef.current(data)
                : data).then(function (data) {
            return update({ payload: { data: data } }, {
                action: actions_1.CRUD_UPDATE,
                onSuccess: onSuccessFromSave
                    ? onSuccessFromSave
                    : onSuccessRef.current
                        ? onSuccessRef.current
                        : function () {
                            notify(successMessage ||
                                'ra.notification.updated', 'info', {
                                smart_count: 1,
                            }, mutationMode === 'undoable');
                            redirect(redirectTo, basePath, data.id, data);
                        },
                onFailure: onFailureFromSave
                    ? onFailureFromSave
                    : onFailureRef.current
                        ? onFailureRef.current
                        : function (error) {
                            notify(typeof error === 'string'
                                ? error
                                : error.message ||
                                    'ra.notification.http_error', 'warning', {
                                _: typeof error === 'string'
                                    ? error
                                    : error && error.message
                                        ? error.message
                                        : undefined,
                            });
                            if (mutationMode === 'undoable' ||
                                mutationMode === 'pessimistic') {
                                refresh();
                            }
                        },
                mutationMode: mutationMode,
            });
        });
    }, [
        transformRef,
        update,
        onSuccessRef,
        onFailureRef,
        notify,
        successMessage,
        redirect,
        basePath,
        refresh,
        mutationMode,
    ]);
    return {
        loading: loading,
        loaded: loaded,
        saving: saving,
        defaultTitle: defaultTitle,
        hasCreate: hasCreate,
        hasEdit: hasEdit,
        hasList: hasList,
        hasShow: hasShow,
        onSuccessRef: onSuccessRef,
        onFailureRef: onFailureRef,
        transformRef: transformRef,
        save: save,
        setOnSuccess: setOnSuccess,
        setOnFailure: setOnFailure,
        setTransform: setTransform,
        resource: resource,
        basePath: basePath,
        record: record,
        redirect: DefaultRedirect,
        version: version,
    };
};
exports.useEditController = useEditController;
var DefaultRedirect = 'list';
