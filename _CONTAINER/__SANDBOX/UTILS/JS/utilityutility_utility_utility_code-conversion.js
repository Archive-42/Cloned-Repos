"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codesToText = exports.codesToDecimal = exports.codesToHex = void 0;
exports.codesToHex = (codes) => codes.map(code => `0x${code.toString(16)}`).join(' ');
exports.codesToDecimal = (codes) => codes.map(code => code.toString(10)).join(' ');
exports.codesToText = (codes) => String.fromCodePoint(...codes);
//# sourceMappingURL=code-conversion.js.map