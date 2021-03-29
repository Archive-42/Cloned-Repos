'use strict';

const fs = require('fs');
const path = require('path');

function createDirIfNotExists() {
    const currentPath = path.basename(this.destinationPath());
    if (currentPath !== this.props.moduleName) {
        const message = `
            Your generator must be inside a folder
            named ${this.props.moduleName}\n
            I'll automatically create this folder.
        `;
        this.log(message);
        fs.mkdir(this.props.moduleName);
        this.destinationRoot(this.destinationPath(this.props.moduleName));
    }
}

module.exports = function () {
    createDirIfNotExists.call(this);
    if (this.options.license) {
        this.composeWith(require.resolve('generator-license/app'), {
            name: this.props.authorName,
            email: this.props.authorEmail,
            website: this.props.authorUrl
        });
    }
};
