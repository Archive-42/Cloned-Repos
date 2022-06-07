"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTranslatable = void 0;
var react_1 = require("react");
var core_1 = require("../core");
var util_1 = require("../util");
var useLocale_1 = __importDefault(require("./useLocale"));
var useTranslate_1 = __importDefault(require("./useTranslate"));
/**
 * Hook supplying the logic to translate a field value in multiple languages.
 *
 * @param options The hook options
 * @param {string} options.defaultLocale The locale of the default selected locale. Defaults to 'en'.
 * @param {strong[]} options.locales An array of the supported locales. Each is an object with a locale and a name property. For example { locale: 'en', name: 'English' }.
 *
 * @returns
 * An object with following properties and methods:
 * - selectedLocale: The locale of the currently selected locale
 * - locales: An array of the supported locales
 * - getLabelInput: A function which returns the translated label for the given field
 * - getSource: A function which returns the source for the given field
 * - selectLocale: A function which set the selected locale
 */
var useTranslatable = function (options) {
    var localeFromUI = useLocale_1.default();
    var _a = options.defaultLocale, defaultLocale = _a === void 0 ? localeFromUI : _a, locales = options.locales;
    var _b = react_1.useState(defaultLocale), selectedLocale = _b[0], setSelectedLocale = _b[1];
    var resource = core_1.useResourceContext({});
    var translate = useTranslate_1.default();
    var context = react_1.useMemo(function () { return ({
        getSource: function (source, locale) {
            if (locale === void 0) { locale = selectedLocale; }
            return source + "." + locale;
        },
        getLabel: function (source) {
            return translate.apply(void 0, util_1.getFieldLabelTranslationArgs({
                source: source,
                resource: resource,
                label: undefined,
            }));
        },
        locales: locales,
        selectedLocale: selectedLocale,
        selectLocale: setSelectedLocale,
    }); }, [locales, resource, selectedLocale, translate]);
    return context;
};
exports.useTranslatable = useTranslatable;
