'use strict';

const _ = require('lodash');
const Generator = require('yeoman-generator');

function getOptions() {
    return {
        moduleName: {
            type: String,
            required: false,
            desc: 'Project name'
        },
        githubUsername: {
            type: String,
            required: false,
            desc: 'GitHub username or organization'
        },
        projectRoot: {
            type: String,
            required: false,
            default: '',
            desc: 'Relative path to the project code root'
        },
        license: {
            type: Boolean,
            required: false,
            default: true,
            desc: 'Include a license'
        },
        readme: {
            type: String,
            required: false,
            desc: 'Content to insert in the README.md file'
        }
    };
}

module.exports = function () {
    Generator.apply(this, arguments);
    _.map(getOptions(), function (value, key) {
        this.option(key, value);
    }.bind(this));
};
