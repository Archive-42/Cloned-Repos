"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.choices = exports.email = exports.regex = exports.number = exports.maxValue = exports.minValue = exports.maxLength = exports.minLength = exports.required = exports.composeSyncValidators = exports.composeValidators = void 0;
var memoize_1 = __importDefault(require("lodash/memoize"));
/* eslint-disable no-underscore-dangle */
/* @link http://stackoverflow.com/questions/46155/validate-email-address-in-javascript */
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
var isEmpty = function (value) {
    return typeof value === 'undefined' ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);
};
var getMessage = function (message, messageArgs, value, values) {
    return typeof message === 'function'
        ? message({
            args: messageArgs,
            value: value,
            values: values,
        })
        : messageArgs
            ? {
                message: message,
                args: messageArgs,
            }
            : message;
};
// If we define validation functions directly in JSX, it will
// result in a new function at every render, and then trigger infinite re-render.
// Hence, we memoize every built-in validator to prevent a "Maximum call stack" error.
var memoize = function (fn) {
    return memoize_1.default(fn, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return JSON.stringify(args);
    });
};
var isFunction = function (value) { return typeof value === 'function'; };
// Compose multiple validators into a single one for use with final-form
var composeValidators = function () {
    var validators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i] = arguments[_i];
    }
    return function (value, values, meta) { return __awaiter(void 0, void 0, void 0, function () {
        var allValidators, _i, allValidators_1, validator, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allValidators = (Array.isArray(validators[0])
                        ? validators[0]
                        : validators).filter(isFunction);
                    _i = 0, allValidators_1 = allValidators;
                    _a.label = 1;
                case 1:
                    if (!(_i < allValidators_1.length)) return [3 /*break*/, 4];
                    validator = allValidators_1[_i];
                    return [4 /*yield*/, validator(value, values, meta)];
                case 2:
                    error = _a.sent();
                    if (error) {
                        return [2 /*return*/, error];
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
exports.composeValidators = composeValidators;
// Compose multiple validators into a single one for use with final-form
var composeSyncValidators = function () {
    var validators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validators[_i] = arguments[_i];
    }
    return function (value, values, meta) {
        var allValidators = (Array.isArray(validators[0])
            ? validators[0]
            : validators).filter(isFunction);
        for (var _i = 0, allValidators_2 = allValidators; _i < allValidators_2.length; _i++) {
            var validator = allValidators_2[_i];
            var error = validator(value, values, meta);
            if (error) {
                return error;
            }
        }
    };
};
exports.composeSyncValidators = composeSyncValidators;
/**
 * Required validator
 *
 * Returns an error if the value is null, undefined, or empty
 *
 * @param {string|Function} message
 *
 * @example
 *
 * const titleValidators = [required('The title is required')];
 * <TextInput name="title" validate={titleValidators} />
 */
exports.required = memoize(function (message) {
    if (message === void 0) { message = 'ra.validation.required'; }
    return Object.assign(function (value, values) {
        return isEmpty(value)
            ? getMessage(message, undefined, value, values)
            : undefined;
    }, { isRequired: true });
});
/**
 * Minimum length validator
 *
 * Returns an error if the value has a length less than the parameter
 *
 * @param {integer} min
 * @param {string|Function} message
 *
 * @example
 *
 * const passwordValidators = [minLength(10, 'Should be at least 10 characters')];
 * <TextInput type="password" name="password" validate={passwordValidators} />
 */
exports.minLength = memoize(function (min, message) {
    if (message === void 0) { message = 'ra.validation.minLength'; }
    return function (value, values) {
        return !isEmpty(value) && value.length < min
            ? getMessage(message, { min: min }, value, values)
            : undefined;
    };
});
/**
 * Maximum length validator
 *
 * Returns an error if the value has a length higher than the parameter
 *
 * @param {integer} max
 * @param {string|Function} message
 *
 * @example
 *
 * const nameValidators = [maxLength(10, 'Should be at most 10 characters')];
 * <TextInput name="name" validate={nameValidators} />
 */
exports.maxLength = memoize(function (max, message) {
    if (message === void 0) { message = 'ra.validation.maxLength'; }
    return function (value, values) {
        return !isEmpty(value) && value.length > max
            ? getMessage(message, { max: max }, value, values)
            : undefined;
    };
});
/**
 * Minimum validator
 *
 * Returns an error if the value is less than the parameter
 *
 * @param {integer} min
 * @param {string|Function} message
 *
 * @example
 *
 * const fooValidators = [minValue(5, 'Should be more than 5')];
 * <NumberInput name="foo" validate={fooValidators} />
 */
exports.minValue = memoize(function (min, message) {
    if (message === void 0) { message = 'ra.validation.minValue'; }
    return function (value, values) {
        return !isEmpty(value) && value < min
            ? getMessage(message, { min: min }, value, values)
            : undefined;
    };
});
/**
 * Maximum validator
 *
 * Returns an error if the value is higher than the parameter
 *
 * @param {integer} max
 * @param {string|Function} message
 *
 * @example
 *
 * const fooValidators = [maxValue(10, 'Should be less than 10')];
 * <NumberInput name="foo" validate={fooValidators} />
 */
exports.maxValue = memoize(function (max, message) {
    if (message === void 0) { message = 'ra.validation.maxValue'; }
    return function (value, values) {
        return !isEmpty(value) && value > max
            ? getMessage(message, { max: max }, value, values)
            : undefined;
    };
});
/**
 * Number validator
 *
 * Returns an error if the value is not a number
 *
 * @param {string|Function} message
 *
 * @example
 *
 * const ageValidators = [number('Must be a number')];
 * <TextInput name="age" validate={ageValidators} />
 */
exports.number = memoize(function (message) {
    if (message === void 0) { message = 'ra.validation.number'; }
    return function (value, values) {
        return !isEmpty(value) && isNaN(Number(value))
            ? getMessage(message, undefined, value, values)
            : undefined;
    };
});
/**
 * Regular expression validator
 *
 * Returns an error if the value does not match the pattern given as parameter
 *
 * @param {RegExp} pattern
 * @param {string|Function} message
 *
 * @example
 *
 * const zipValidators = [regex(/^\d{5}(?:[-\s]\d{4})?$/, 'Must be a zip code')];
 * <TextInput name="zip" validate={zipValidators} />
 */
exports.regex = memoize_1.default(function (pattern, message) {
    if (message === void 0) { message = 'ra.validation.regex'; }
    return function (value, values) {
        return !isEmpty(value) && typeof value === 'string' && !pattern.test(value)
            ? getMessage(message, { pattern: pattern }, value, values)
            : undefined;
    };
}, function (pattern, message) {
    return pattern.toString() + message;
});
/**
 * Email validator
 *
 * Returns an error if the value is not a valid email
 *
 * @param {string|Function} message
 *
 * @example
 *
 * const emailValidators = [email('Must be an email')];
 * <TextInput name="email" validate={emailValidators} />
 */
exports.email = memoize(function (message) {
    if (message === void 0) { message = 'ra.validation.email'; }
    return exports.regex(EMAIL_REGEX, message);
});
var oneOfTypeMessage = function (_a) {
    var args = _a.args;
    return ({
        message: 'ra.validation.oneOf',
        args: args,
    });
};
/**
 * Choices validator
 *
 * Returns an error if the value is not among the list passed as parameter
 *
 * @param {array} list
 * @param {string|Function} message
 *
 * @example
 *
 * const genderValidators = [choices(['male', 'female'], 'Must be either Male or Female')];
 * <TextInput name="gender" validate={genderValidators} />
 */
exports.choices = memoize(function (list, message) {
    if (message === void 0) { message = oneOfTypeMessage; }
    return function (value, values) {
        return !isEmpty(value) && list.indexOf(value) === -1
            ? getMessage(message, { list: list }, value, values)
            : undefined;
    };
});
