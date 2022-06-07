'use strict';

const Config = require('../config');

function getCopyFiles(additionalFiles) {
    const copyFiles = Config.get('DEFAULT_FILES');
    if (Array.isArray(additionalFiles)) {
        return copyFiles.concat(additionalFiles);
    }
    return copyFiles;
}

function getCI(selectedOption) {
    return Config.get('CI_OPTIONS')[selectedOption];
}

function getReadmeParams() {
    return {
        moduleName: this.props.moduleName,
        githubAccount: this.props.githubAccount,
        description: this.props.description
    };
}

function getProjectRoot(projectRoot) {
    if (projectRoot) {
        return `${projectRoot}/`;
    }
    return projectRoot;
}

function getPackageJsonParams(license) {
    return {
        moduleName: this.props.moduleName,
        description: this.props.description,
        homepage: this.props.homepage,
        authorName: this.props.authorName,
        authorEmail: this.props.authorEmail,
        authorUrl: this.props.authorUrl,
        projectRoot: getProjectRoot(this.options.projectRoot),
        license: license
    };
}

module.exports = function () {
    const currentPackage = this.fs.readJSON(
        this.destinationPath('package.json'),
        {}
    );

    this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        getReadmeParams.call(this)
    );

    this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('package.json'),
        getPackageJsonParams.call(this, currentPackage.license)
    );

    const ci = getCI(this.props.ci);
    getCopyFiles([ci]).map(function (file) {
        this.fs.copy(
            this.templatePath(file),
            this.destinationPath(file)
        );
    }.bind(this));
};
