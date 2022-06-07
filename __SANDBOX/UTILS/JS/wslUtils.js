"use strict";
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const cpUtils_1 = require("./cpUtils");
const osUtils_1 = require("./osUtils");
function useWsl() {
    const leetCodeConfig = vscode.workspace.getConfiguration("leetcode");
    return osUtils_1.isWindows() && leetCodeConfig.get("useWsl") === true;
}
exports.useWsl = useWsl;
function toWslPath(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield cpUtils_1.executeCommand("wsl", ["wslpath", "-u", `"${path.replace(/\\/g, "/")}"`])).trim();
    });
}
exports.toWslPath = toWslPath;
function toWinPath(path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (path.startsWith("\\mnt\\")) {
            return (yield cpUtils_1.executeCommand("wsl", ["wslpath", "-w", `"${path.replace(/\\/g, "/").substr(0, 6)}"`])).trim() + path.substr(7);
        }
        return (yield cpUtils_1.executeCommand("wsl", ["wslpath", "-w", "/"])).trim() + path;
    });
}
exports.toWinPath = toWinPath;
//# sourceMappingURL=wslUtils.js.map