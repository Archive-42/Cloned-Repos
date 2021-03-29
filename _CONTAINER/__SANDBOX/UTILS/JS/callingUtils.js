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
const https = require("https");
const uuid = require("uuid");
const common_1 = require("./externalApp/common");
const packageJson = require('../../package.json');
exports.PLATFORMS = {
    'win32-ia32': 922,
    'win32-x64': 923,
    'linux-x64': 924,
    'darwin-x64': 925
};
function getVSLSTokenFromAuthService(trace) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            hostname: 'authsvc-server.teams.microsoft.com',
            port: 443,
            path: '/v1.0/authz/visitor',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-ms-request-id': uuid(),
                'x-ms-client-type': packageJson.name
            }
        };
        const data = JSON.stringify({
            'tenantId': '72f988bf-86f1-41af-91ab-2d7cd011db47'
        });
        let token;
        const skypeTokenReady = new common_1.DeferredPromise();
        let result = '';
        const req = https.request(options, (res) => {
            if (res.statusCode !== 200) {
                skypeTokenReady.reject(`Expected 200 status code to get SkypeToken. status code: ${res.statusCode}`);
                return;
            }
            res.setEncoding('utf8');
            res.on('data', (data) => {
                result += data;
            });
            res.on('end', function () {
                const response = JSON.parse(result);
                token = response.tokens;
                skypeTokenReady.resolve();
            });
        });
        req.on('error', (error) => {
            skypeTokenReady.reject(`HTTPS request failed for SkypeToken: ${error.message}`);
        });
        req.write(data);
        req.end();
        yield skypeTokenReady.promise.catch((e) => {
            throw new Error(e);
        });
        if (!token) {
            throw new Error('Error retrieving SkypeToken');
        }
        token.skypeId = getSkypeId(token.skypeToken);
        return token;
    });
}
exports.getVSLSTokenFromAuthService = getVSLSTokenFromAuthService;
function getNormalizedVersion() {
    let version = packageJson.version;
    if (version.indexOf('-') !== -1) {
        version = version.substr(0, version.indexOf('-'));
        return `${version}.999`;
    }
    return `${version}.0`;
}
exports.getNormalizedVersion = getNormalizedVersion;
function getSkypeId(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));
        if (!decoded.skypeid) {
            throw new Error('skypeid claim not found');
        }
        return decoded.skypeid;
    }
    catch (e) {
        throw new Error(`Cannot retrieve skypeid from token: ${e.message}`);
    }
}
//# sourceMappingURL=callingUtils.js.map