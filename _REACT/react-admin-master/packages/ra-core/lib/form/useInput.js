"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_final_form_1 = require("react-final-form");
var validate_1 = require("./validate");
var isRequired_1 = __importDefault(require("./isRequired"));
var react_1 = require("react");
var useFormGroupContext_1 = require("./useFormGroupContext");
var useFormContext_1 = require("./useFormContext");
var useInput = function (_a) {
    var defaultValue = _a.defaultValue, id = _a.id, name = _a.name, source = _a.source, validate = _a.validate, customOnBlur = _a.onBlur, customOnChange = _a.onChange, customOnFocus = _a.onFocus, isRequiredOption = _a.isRequired, options = __rest(_a, ["defaultValue", "id", "name", "source", "validate", "onBlur", "onChange", "onFocus", "isRequired"]);
    var finalName = name || source;
    var formGroupName = useFormGroupContext_1.useFormGroupContext();
    var formContext = useFormContext_1.useFormContext();
    react_1.useEffect(function () {
        if (!formContext || !formGroupName) {
            return;
        }
        formContext.registerField(source, formGroupName);
        return function () {
            formContext.unregisterField(source, formGroupName);
        };
    }, [formContext, formGroupName, source]);
    var sanitizedValidate = Array.isArray(validate)
        ? validate_1.composeValidators(validate)
        : validate;
    var _b = react_final_form_1.useField(finalName, __assign({ initialValue: defaultValue, validate: sanitizedValidate }, options)), input = _b.input, meta = _b.meta;
    // Extract the event handlers so that we can provide ours
    // allowing users to provide theirs without breaking the form
    var onBlur = input.onBlur, onChange = input.onChange, onFocus = input.onFocus, inputProps = __rest(input, ["onBlur", "onChange", "onFocus"]);
    var handleBlur = react_1.useCallback(function (event) {
        onBlur(event);
        if (typeof customOnBlur === 'function') {
            customOnBlur(event);
        }
    }, [onBlur, customOnBlur]);
    var handleChange = react_1.useCallback(function (event) {
        onChange(event);
        if (typeof customOnChange === 'function') {
            customOnChange(event);
        }
    }, [onChange, customOnChange]);
    var handleFocus = react_1.useCallback(function (event) {
        onFocus(event);
        if (typeof customOnFocus === 'function') {
            customOnFocus(event);
        }
    }, [onFocus, customOnFocus]);
    // If there is an input prop, this input has already been enhanced by final-form
    // This is required in for inputs used inside other inputs (such as the SelectInput inside a ReferenceInput)
    if (options.input) {
        return {
            id: id || source,
            input: options.input,
            meta: options.meta,
            isRequired: isRequiredOption || isRequired_1.default(validate),
        };
    }
    return {
        id: id || source,
        input: __assign(__assign({}, inputProps), { onBlur: handleBlur, onChange: handleChange, onFocus: handleFocus }),
        meta: meta,
        isRequired: isRequiredOption || isRequired_1.default(validate),
    };
};
exports.default = useInput;
