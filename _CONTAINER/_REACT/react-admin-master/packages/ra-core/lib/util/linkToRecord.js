"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (basePath, id, linkType) {
    if (linkType === void 0) { linkType = 'edit'; }
    var link = basePath + "/" + encodeURIComponent(id);
    if (linkType === 'show') {
        return link + "/show";
    }
    return link;
});
