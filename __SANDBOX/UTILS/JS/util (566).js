"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOptions_1 = require("../constants/allowedOptions");
const string_constnats_1 = require("../constants/string-constnats");
function getBranchList(output) {
    let responseObj = {
        branchList: this.parseGitJson(output),
        currentBranch: ""
    };
    responseObj.branchList = responseObj.branchList.filter((branch) => {
        if (branch.current === "*") {
            responseObj.currentBranch = branch.label;
        }
        else {
            if (branch.label.indexOf("origin") != -1) {
                branch.description = "Remote branch at " + branch.description;
            }
            return true;
        }
    });
    return responseObj;
}
exports.getBranchList = getBranchList;
function getStashList(output) {
    if (output.length == 0) {
        return [];
    }
    let stashList = this.parseGitJson(output);
    stashList.forEach(stashItem => {
        stashItem.label = stashItem.label.replace("WIP ", "");
        stashItem.label = stashItem.label.charAt(0).toUpperCase() + stashItem.label.slice(1);
    });
    return stashList;
}
exports.getStashList = getStashList;
function processUserOptions(userSettings, optionsType) {
    let invalidOptions = [], requireCommitMessage = false, addMessage = false;
    for (let index = 0; index < userSettings.length; index++) {
        let option = userSettings[index];
        if (option == "no-commit") {
            addMessage = true;
        }
        if (!allowedOptions_1.allowedOptions[optionsType][option]) {
            invalidOptions.push(option);
            userSettings.splice(index, 1);
            index--;
        }
        else if (optionsType === "merge" && (option === "m" || string_constnats_1.default.userSettings.get("customCommitMessage"))) {
            requireCommitMessage = true;
        }
    }
    return {
        validOptions: userSettings,
        requireCommitMessage: requireCommitMessage,
        invalidOptions: invalidOptions,
        addMessage: addMessage
    };
}
exports.processUserOptions = processUserOptions;
function parseGitJson(jsonString) {
    jsonString = jsonString.replace(/[:{,\s]'/g, (matcher) => matcher.replace("'", '"'))
        .replace(/'[,}:\s]/g, (matcher) => matcher.replace("'", '"'));
    jsonString = "[" + jsonString.substring(0, jsonString.lastIndexOf("},")) + "}]";
    return JSON.parse(jsonString);
}
exports.parseGitJson = parseGitJson;
//# sourceMappingURL=util.js.map