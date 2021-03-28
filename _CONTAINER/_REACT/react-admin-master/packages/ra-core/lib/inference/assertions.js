"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.valuesAreObject = exports.isObject = exports.valuesAreDateString = exports.isDateString = exports.valuesAreDate = exports.isDate = exports.valuesAreArray = exports.isArray = exports.valuesAreHtml = exports.isHtml = exports.valuesAreString = exports.isString = exports.valuesAreBoolean = exports.isBoolean = exports.valuesAreInteger = exports.isInteger = exports.valuesAreNumeric = exports.isNumeric = void 0;
var parse_1 = __importDefault(require("date-fns/parse"));
var isNumeric = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
exports.isNumeric = isNumeric;
var valuesAreNumeric = function (values) { return values.every(exports.isNumeric); };
exports.valuesAreNumeric = valuesAreNumeric;
var isInteger = function (value) { return Number.isInteger(value); };
exports.isInteger = isInteger;
var valuesAreInteger = function (values) { return values.every(exports.isInteger); };
exports.valuesAreInteger = valuesAreInteger;
var isBoolean = function (value) { return typeof value === 'boolean'; };
exports.isBoolean = isBoolean;
var valuesAreBoolean = function (values) { return values.every(exports.isBoolean); };
exports.valuesAreBoolean = valuesAreBoolean;
var isString = function (value) { return typeof value === 'string'; };
exports.isString = isString;
var valuesAreString = function (values) { return values.every(exports.isString); };
exports.valuesAreString = valuesAreString;
var HtmlRegexp = /<([A-Z][A-Z0-9]*)\b[^>]*>(.*?)<\/\1>/i;
var isHtml = function (value) { return HtmlRegexp.test(value); };
exports.isHtml = isHtml;
var valuesAreHtml = function (values) { return values.every(exports.isHtml); };
exports.valuesAreHtml = valuesAreHtml;
var isArray = function (value) { return Array.isArray(value); };
exports.isArray = isArray;
var valuesAreArray = function (values) { return values.every(exports.isArray); };
exports.valuesAreArray = valuesAreArray;
var isDate = function (value) { return value instanceof Date; };
exports.isDate = isDate;
var valuesAreDate = function (values) { return values.every(exports.isDate); };
exports.valuesAreDate = valuesAreDate;
var isDateString = function (value) {
    return typeof value === 'string' && !isNaN(parse_1.default(value).getDate());
};
exports.isDateString = isDateString;
var valuesAreDateString = function (values) {
    return values.every(exports.isDateString);
};
exports.valuesAreDateString = valuesAreDateString;
var isObject = function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
};
exports.isObject = isObject;
var valuesAreObject = function (values) { return values.every(exports.isObject); };
exports.valuesAreObject = valuesAreObject;
