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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class WorkspaceUtil {
    static verifyWorkspace(path) {
        return vscode_1.workspace.getWorkspaceFolder(path);
    }
    static workspaceHasHTMLFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            let _hasHTMLFiles = false;
            try {
                const files = yield vscode_1.workspace.findFiles("**/*.html");
                _hasHTMLFiles = files && files.length > 0;
            }
            catch (err) {
                console.log(err);
            }
            return _hasHTMLFiles;
        });
    }
    static isWorkspaceValid() {
        if (!vscode_1.workspace.workspaceFolders) {
            vscode_1.window.showInformationMessage("Open a folder or workspace. File -> Open Folder");
            return false;
        }
        if (!vscode_1.workspace.workspaceFolders.length) {
            vscode_1.window.showInformationMessage("You've not added any folder in the workspace");
            return false;
        }
        return true;
    }
}
exports.default = WorkspaceUtil;
//# sourceMappingURL=workspaceUtil.js.map