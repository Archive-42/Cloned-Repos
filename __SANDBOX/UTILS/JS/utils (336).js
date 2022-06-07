"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
const http = require("http");
const https = require("https");
const path = require("path");
const shelljs_1 = require("shelljs");
const fs_1 = require("fs");
/**
 * prepare directory for specified file.
 * @param filePath
 */
function prepareDirForFile(filePath) {
    let dirName = path.dirname(filePath);
    try {
        shelljs_1.mkdir("-p", dirName);
    }
    catch (error) {
        console.log(error);
        return false;
    }
    return true;
}
exports.prepareDirForFile = prepareDirForFile;
/**
 * Fetch file to specified local folder
 * @param fileURL
 * @param dest
 */
function fetchAndSaveFile(fileURL, filepath) {
    let dest = path.dirname(filepath);
    let basename = path.basename(filepath);
    return new Promise((resolve, reject) => {
        const timeout = 10000;
        const urlParsed = url.parse(fileURL);
        const uri = urlParsed.pathname.split("/");
        let req;
        let filename = basename || uri[uri.length - 1].match(/(\w*\.?-?)+/)[0];
        if (urlParsed.protocol === null) {
            fileURL = "http://" + fileURL;
        }
        req = urlParsed.protocol === "https:" ? https : http;
        let request = req
            .get(fileURL, response => {
            // Make sure extension is present (mostly for images)
            if (filename.indexOf(".") < 0) {
                const contentType = response.headers["content-type"];
                filename += `.${contentType.split("/")[1]}`;
            }
            const targetPath = `${dest}/${filename}`;
            response.on("end", function () {
                resolve(targetPath);
            });
            if (response.statusCode === 200) {
                if (prepareDirForFile(targetPath)) {
                    var file = fs_1.createWriteStream(targetPath);
                    response.pipe(file);
                }
                else {
                    reject("Make folder failed:" + dest);
                }
            }
            else {
                reject(`Downloading ${fileURL} failed`);
            }
        }).setTimeout(timeout, () => {
            request.abort();
            reject(`Request Timeout(${timeout} ms):Download ${fileURL} failed!`);
        })
            .on("error", e => {
            reject(`Downloading ${fileURL} failed! Please make sure URL is valid.`);
        });
    });
}
exports.fetchAndSaveFile = fetchAndSaveFile;
//# sourceMappingURL=utils.js.map