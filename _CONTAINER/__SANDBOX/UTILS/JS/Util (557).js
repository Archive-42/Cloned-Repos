"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class Util {
    static isHTMLFile(file) {
        let isHTML = false;
        const filename = path_1.basename(file);
        if (filename.indexOf('.html') > -1) {
            isHTML = true;
        }
        return isHTML;
    }
}
exports.default = Util;
//# sourceMappingURL=Util.js.map