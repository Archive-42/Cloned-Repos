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
const vscode = require("vscode");
const child_process_1 = require("child_process");
const os_1 = require("os");
const fs = require("fs");
const path = require("path");
const packages = require("../../package.json");
const crypto = require("crypto");
const uploads_1 = require("./uploads");
const index_1 = require("../i18n/index");
let pkg = packages;
let locale = index_1.default();
exports.locale = locale;
function getUpload(config) {
    switch (config.base.uploadMethod) {
        case 'Local': return new uploads_1.default.Local(config);
        case 'Coding': return new uploads_1.default.Coding(config);
        case 'Imgur': return new uploads_1.default.Imgur(config);
        case 'SM.MS': return new uploads_1.default.SM_MS(config);
        case 'Qiniu': return new uploads_1.default.Qiniu(config);
        case 'DIY': return new uploads_1.default.Define(config);
        case '本地': return new uploads_1.default.Local(config);
        case '七牛': return new uploads_1.default.Qiniu(config);
        case '自定义': return new uploads_1.default.Define(config);
        case '自定義': return new uploads_1.default.Define(config);
    }
    return null;
}
function showProgress(message) {
    let show = true;
    function stopProgress() {
        show = false;
    }
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: message,
        cancellable: false
    }, (progress, token) => {
        return new Promise(resolve => {
            let timer = setInterval(() => {
                if (show) {
                    return;
                }
                clearInterval(timer);
                resolve();
            }, 100);
        });
    });
    return stopProgress;
}
function editorEdit(selection, text) {
    return new Promise((resolve, reject) => {
        var _a;
        (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.edit(editBuilder => {
            if (selection) {
                editBuilder.replace(selection, text);
            }
        }).then(resolve);
    });
}
function getSelections() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No open text editor
    }
    let selections = editor.selections;
    return selections;
}
function formatName(format, filePath, isPaste) {
    return __awaiter(this, void 0, void 0, function* () {
        let saveName = format;
        let variables = [
            'filename', 'mdname', 'hash', 'timestramp', 'YY', 'MM', 'DD', 'HH', 'hh', 'mm', 'ss', 'mss', 'rand,(\\d+)'
        ];
        for (let i = 0; i < variables.length; i++) {
            let reg = new RegExp(`\\$\\{${variables[i]}\\}`, 'g');
            let mat = format.match(reg);
            if (!mat) {
                continue;
            }
            switch (variables[i]) {
                case 'filename': {
                    let data = !isPaste ? path.basename(filePath, path.extname(filePath)) :
                        (path.basename(yield prompt(locale['named_paste'], path.basename(filePath, '.png'))) || '');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'mdname': {
                    let data = path.basename(getCurrentFilePath(), path.extname(getCurrentFilePath()));
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'hash': {
                    let data = hash(fs.readFileSync(filePath));
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'timestramp': {
                    let data = new Date().getTime().toString();
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'YY': {
                    let data = new Date().getFullYear().toString();
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'MM': {
                    let data = (new Date().getMonth() + 1).toString().padStart(2, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'DD': {
                    let data = (new Date().getDate()).toString().padStart(2, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'hh': {
                    let hours = new Date().getHours();
                    let data = (hours > 12 ? hours - 12 : hours).toString().padStart(2, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'HH': {
                    let data = new Date().getHours().toString().padStart(2, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'mm': {
                    let data = new Date().getMinutes().toString().padStart(2, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'ss': {
                    let data = new Date().getSeconds().toString().padStart(2, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'mss': {
                    let data = new Date().getMilliseconds().toString().padStart(3, '0');
                    saveName = saveName.replace(reg, data);
                    break;
                }
                case 'rand,(\\d+)': {
                    for (let j = 0; j < mat.length; j++) {
                        let numberMat = mat[j].match(/\d+/);
                        if (!numberMat) {
                            continue;
                        }
                        let n = parseInt(numberMat[0]);
                        let data = parseInt((Math.random() * n).toString()).toString();
                        saveName = saveName.replace(mat[j], data);
                    }
                    break;
                }
            }
        }
        return saveName + (filePath ? path.extname(filePath) : '.png');
    });
}
function mkdirs(dirname) {
    //console.log(dirname);  
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirs(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
function getConfig() {
    let keys = Object.keys(pkg.contributes.configuration.properties);
    let values = {};
    function toVal(str, val, cfg) {
        let keys = str.split('.');
        if (keys.length === 1) {
            cfg[keys[0]] = val;
        }
        else {
            cfg[keys[0]] = toVal(keys.slice(1).join('.'), val, cfg[keys[0]] || {});
        }
        return cfg;
    }
    keys.forEach(k => toVal(k.split('.').slice(1).join('.'), vscode.workspace.getConfiguration().get(k), values));
    return values;
}
function getPasteImage(imagePath) {
    return new Promise((resolve, reject) => {
        if (!imagePath) {
            return;
        }
        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = path.join(__dirname, '..', '..', 'asserts/pc.ps1');
            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = fs.existsSync(command);
            let output = '';
            if (!powershellExisted) {
                command = "powershell";
            }
            const powershell = child_process_1.spawn(command, [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                '-windowstyle', 'hidden',
                '-file', scriptPath,
                imagePath
            ]);
            powershell.on('error', (e) => {
                if (e.code === 'ENOENT') {
                    vscode.window.showErrorMessage(locale['powershell_not_found']);
                }
                else {
                    vscode.window.showErrorMessage(e);
                }
            });
            powershell.on('exit', function (code, signal) {
                // console.debug('exit', code, signal);
            });
            powershell.stdout.on('data', (data) => {
                if (data.toString().indexOf('Active code page:') < 0) {
                    output += data.toString();
                }
            });
            powershell.on('close', (code) => {
                resolve(output.trim().split('\n').map(i => i.trim()));
            });
        }
        else if (platform === 'darwin') {
            // Mac
            let scriptPath = path.join(__dirname, '..', '..', 'asserts/mac.applescript');
            let ascript = child_process_1.spawn('osascript', [scriptPath, imagePath]);
            ascript.on('error', (e) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.debug('exit', code, signal);
            });
            ascript.stdout.on('data', (data) => {
                resolve(data.toString().trim().split('\n'));
            });
        }
        else {
            // Linux 
            let scriptPath = path.join(__dirname, '..', '..', 'asserts/linux.sh');
            let ascript = child_process_1.spawn('sh', [scriptPath, imagePath]);
            ascript.on('error', (e) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.log('exit',code,signal);
            });
            ascript.stdout.on('data', (data) => {
                let result = data.toString().trim();
                if (result === "no xclip") {
                    vscode.window.showInformationMessage(locale['install_xclip']);
                    return;
                }
                let match = result.trim().match(/((\/[^\/]+)+\/[^\/]*?\.(jpg|jpeg|gif|bmp|png))/g);
                resolve(match || []);
            });
        }
    });
}
function getCurrentRoot() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) {
        return '';
    }
    const resource = editor.document.uri;
    if (resource.scheme !== 'file') {
        return '';
    }
    const folder = vscode.workspace.getWorkspaceFolder(resource);
    if (!folder) {
        return '';
    }
    return folder.uri.fsPath;
}
function getCurrentFilePath() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) {
        return '';
    }
    return editor.document.uri.fsPath;
}
function getTmpFolder() {
    let savePath = path.join(os_1.tmpdir(), pkg.name);
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }
    return savePath;
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function confirm(message, options) {
    return new Promise((resolve, reject) => {
        return vscode.window.showInformationMessage(message, ...options).then(resolve);
    });
}
function prompt(message, defaultVal = '') {
    return new Promise((resolve, reject) => {
        return vscode.window.showInputBox({
            value: defaultVal,
            prompt: message
        }).then(resolve);
    });
}
function hash(buffer) {
    let sha256 = crypto.createHash('sha256');
    let hash = sha256.update(buffer).digest('hex');
    return hash;
}
function getOpenCmd() {
    let cmd = 'explorer';
    if (process.platform === 'win32') {
        cmd = 'explorer';
    }
    else if (process.platform === 'linux') {
        cmd = 'xdg-open';
    }
    else if (process.platform === 'darwin') {
        cmd = 'open';
    }
    return cmd;
}
function noticeComment(context) {
    let notice = context.globalState.get('notice');
    let usetimes = context.globalState.get('usetimes') || 0;
    if (!notice && usetimes > 100) {
        confirm(locale['like.extension'], [locale['like.ok'], locale['like.no'], locale['like.later']])
            .then((option) => {
            switch (option) {
                case locale['like.ok']:
                    child_process_1.exec(`${getOpenCmd()} https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image`);
                    context.globalState.update('notice', true);
                    break;
                case locale['like.no']:
                    context.globalState.update('notice', true);
                    break;
                case locale['like.later']:
                    usetimes = 50;
                    context.globalState.update('usetimes', usetimes);
                    context.globalState.update('notice', false);
                    break;
            }
        })
            .catch(e => console.log(e));
    }
    else if (!notice) {
        context.globalState.update('usetimes', ++usetimes);
    }
}
exports.default = {
    getUpload,
    showProgress,
    editorEdit,
    formatName,
    mkdirs,
    getConfig,
    getSelections,
    getPasteImage,
    getCurrentRoot,
    getCurrentFilePath,
    getTmpFolder,
    noticeComment,
    sleep,
    confirm,
    prompt,
    hash,
};
//# sourceMappingURL=utils.js.map