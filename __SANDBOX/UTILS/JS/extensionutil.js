"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const os = require("os");
const vscode = require("vscode");
const outputTraceListener_1 = require("./tracing/outputTraceListener");
const traceSource_1 = require("./tracing/traceSource");
const logFileTraceListener_1 = require("./tracing/logFileTraceListener");
const telemetry_1 = require("./telemetry/telemetry");
const telemetryStrings_1 = require("./telemetry/telemetryStrings");
const packageManager_1 = require("./packageManager");
const constants_1 = require("./constants");
const defaultProgressOptions = {
    location: vscode.ProgressLocation.Window,
    title: ''
};
const userProgressOptionsDefaults = Object.assign({}, defaultProgressOptions, { isUserInitiated: true, cancellationToken: null });
class ExtensionUtil {
    static isCommandDefined(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = yield vscode.commands.getCommands();
            return commands.indexOf(command) >= 0;
        });
    }
    static get Context() {
        return ExtensionUtil.extensionContext;
    }
    static getGlobalStoragePath() {
        // Returns the globalStoragePath if available.
        // Otherwise returns the local extension path.
        const globalStoragePath = ExtensionUtil.Context.globalStoragePath;
        return globalStoragePath || ExtensionUtil.Context.extensionPath;
    }
    static getElectronPath() {
        const liveShareExtension = vscode.extensions.getExtension('ms-vsliveshare.vsliveshare-audio');
        const packageCode = packageManager_1.PackageManager.getPackageCode(liveShareExtension.packageJSON, 'electron');
        let electronPath;
        switch (os.platform()) {
            case 'darwin':
                electronPath = path.join(ExtensionUtil.getGlobalStoragePath(), `/${packageCode}/${constants_1.ELECTRON_DIST_FOLDER}`, 'Electron.app/Contents/MacOS/Electron');
                break;
            case 'freebsd':
            case 'linux':
                electronPath = path.join(ExtensionUtil.getGlobalStoragePath(), `/${packageCode}/${constants_1.ELECTRON_DIST_FOLDER}`, 'electron');
                break;
            case 'win32':
            default:
                electronPath = path.join(ExtensionUtil.getGlobalStoragePath(), `/${packageCode}/${constants_1.ELECTRON_DIST_FOLDER}`, 'electron.exe');
                break;
        }
        return ExtensionUtil.normalizePath(electronPath);
    }
    static getSlimCorePath() {
        const liveShareExtension = vscode.extensions.getExtension('ms-vsliveshare.vsliveshare-audio');
        const packageCode = packageManager_1.PackageManager.getPackageCode(liveShareExtension.packageJSON, 'slimcore');
        const slimCorePath = path.join(ExtensionUtil.getGlobalStoragePath(), `${packageCode}`);
        return ExtensionUtil.normalizePath(slimCorePath);
    }
    static tryRegisterCommand(command, callback, isEditorCommand = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDefined = yield ExtensionUtil.isCommandDefined(command);
            let disposable;
            if (isDefined) {
                disposable = this.registeredCommands[command];
            }
            else {
                try {
                    if (isEditorCommand) {
                        disposable = vscode.commands.registerTextEditorCommand(command, callback);
                    }
                    else {
                        disposable = ExtensionUtil.registerCommand(command, callback);
                    }
                    ExtensionUtil.registeredCommands[command] = disposable;
                    ExtensionUtil.Context.subscriptions.push(disposable);
                }
                catch (e) {
                    traceSource_1.defaultTraceSource.error(e.message);
                }
            }
            return disposable;
        });
    }
    static runWithProgress(fn, progressText) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                location: vscode.ProgressLocation.Window,
                title: progressText
            };
            return yield vscode.window.withProgress(options, (progress) => {
                return fn();
            });
        });
    }
    //If ```progressText``` is the empty string, then no spinner is shown, hence the space
    static runWithProgressWithFeedback(fn, progressOptions = userProgressOptionsDefaults) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = Object.assign({}, userProgressOptionsDefaults, progressOptions);
            const { isUserInitiated, cancellationToken } = options;
            if (cancellationToken && cancellationToken.isCancellationRequested) {
                return;
            }
            if (!isUserInitiated) {
                // If the ```title``` is the empty string, then no notification is shown
                options.title = '';
            }
            return yield vscode.window.withProgress(options, (progress) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                    if (cancellationToken) {
                        cancellationToken.onCancellationRequested(() => {
                            resolve();
                        });
                    }
                    try {
                        resolve(yield fn(progress));
                    }
                    catch (e) {
                        reject(e);
                    }
                }));
            }));
        });
    }
    static Init(context) {
        return __awaiter(this, void 0, void 0, function* () {
            ExtensionUtil.extensionContext = context;
            this.outputTraceListener = new outputTraceListener_1.OutputTraceListener('Visual Studio Live Share Audio');
            traceSource_1.defaultTraceSource.addTraceListener(this.outputTraceListener);
            this.setDiagnosticLogging();
            const logFileTraceListener = new logFileTraceListener_1.LogFileTraceListener('VSLSAudio');
            yield logFileTraceListener.openAsync();
            traceSource_1.defaultTraceSource.info('Trace log: ' + logFileTraceListener.logFileName);
            traceSource_1.defaultTraceSource.addTraceListener(logFileTraceListener);
            ExtensionUtil.handleUnhandledRejections();
        });
    }
    static setDiagnosticLogging() {
        return __awaiter(this, void 0, void 0, function* () {
            const liveShareSettings = vscode.workspace.getConfiguration('liveshare');
            this.diagnosticLoggingValue = liveShareSettings && (liveShareSettings.diagnosticLogging === true);
            if (this.diagnosticLoggingValue) {
                this.outputTraceListener.addOutputChannel();
            }
            else {
                this.outputTraceListener.removeOutputChannel();
            }
        });
    }
    /**
     * Registers a command with VS Code, using a wrapper around the command that catches
     * any unhandled errors and reports them to the user and to telemetry.
     */
    static registerCommand(command, callback) {
        return vscode.commands.registerCommand(command, function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                telemetry_1.Telemetry.sendCommandEvent(command);
                try {
                    return yield callback(...args);
                }
                catch (e) {
                    ExtensionUtil.reportCommandError(command, e);
                }
            });
        });
    }
    static reportCommandError(command, e) {
        const message = `Unhandled error in '${command}' command: `;
        traceSource_1.defaultTraceSource.error(message + (e.stack || e.message || e));
        telemetry_1.Telemetry.sendFault(telemetryStrings_1.TelemetryEventNames.UNHANDLED_COMMAND_ERROR_FAULT, telemetry_1.FaultType.Error, message + (e.message || e), e);
        ExtensionUtil.showErrorAsync(e);
    }
    /**
     * Shows an error message to the user, with a [Report a Problem] button that makes
     * it easy to create an issue online.
     */
    static showErrorAsync(error, options = {}, items = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = typeof error === 'string' ? error : error.message;
            const { title, error: customError = message, modal } = options;
            const reportAProblemItem = { title: 'Report a Problem' };
            const result = yield vscode.window.showErrorMessage(message, { modal }, reportAProblemItem, ...items);
            if (result && result.title === reportAProblemItem.title) {
                const versionInfo = ExtensionUtil.getVersionInfo();
                const issueTitle = `[VS Code] [Audio] ${title || message}`;
                const issueBody = `<!--Attach verbose logs as follows:
1. Press F1 (or Ctrl-Shift-P), type "export logs" and run the "Live Share: Export Logs" command.
2. Drag and drop the zip to the issue on this screen and wait for it to upload before creating the issue.
For feature requests, please include enough of this same info so we know if the request is tool or language/platform specific.-->

Error:
${customError}

Steps to Reproduce:
1.
2.
`
                    + `\n||Version Data|\n|-:|:-|\n`
                    + Object.keys(versionInfo)
                        .map(key => `|**${key}**|${versionInfo[key]}|`)
                        .join('\n');
                const gitHubUri = 'https://github.com/MicrosoftDocs/live-share';
                vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`${gitHubUri}/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`));
            }
            return result;
        });
    }
    static getVersionInfo() {
        return {
            extensionName: 'VSLS-Audio',
            extensionVersion: ExtensionUtil.getExtensionVersion(),
            applicationName: 'VSCode',
            applicationVersion: vscode.version,
            platformName: ExtensionUtil.getPlatformName(),
            platformVersion: os.release(),
        };
    }
    static getExtensionVersion() {
        const packageJsonPath = path.join(__dirname, '..', 'package.json');
        const { version } = require(packageJsonPath);
        return version;
    }
    static getPlatformName() {
        switch (os.platform()) {
            case 'win32': return 'Windows';
            case 'darwin': return 'MacOS';
            case 'linux': return 'Linux';
            default: return os.platform();
        }
    }
    static handleUnhandledRejections() {
        const srcDir = path.resolve(__dirname, '..');
        process.on('unhandledRejection', (e, p) => {
            if (!(e.stack && e.stack.indexOf(srcDir) > 0)) {
                // Ignore unhandled rejections from other extensions that share the process.
                return;
            }
            const message = 'Unhandled promise rejection: ';
            traceSource_1.defaultTraceSource.error(message + e.stack);
            telemetry_1.Telemetry.sendFault(telemetryStrings_1.TelemetryEventNames.UNHANDLED_REJECTION_FAULT, telemetry_1.FaultType.Error, message + e.message, e);
            // Prevent the unhandled rejection from being reported in the debug console by VS Code.
            p.catch(() => { });
        });
    }
    static normalizePath(value) {
        return value.replace(/\\/g, '\\\\');
    }
}
ExtensionUtil.registeredCommands = {};
exports.ExtensionUtil = ExtensionUtil;
//# sourceMappingURL=extensionutil.js.map