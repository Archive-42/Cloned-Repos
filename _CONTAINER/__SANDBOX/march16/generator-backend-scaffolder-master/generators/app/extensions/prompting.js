'use strict';

const _ = require('lodash');
const path = require('path');
const yosay = require('yosay');

const Config = require('../config');

function getPrompts() {
    return [
        {
            type: 'input',
            name: 'moduleName',
            message: 'Module Name',
            default: _.kebabCase(path.basename(process.cwd())),
            filter: _.kebabCase
        },
        {
            type: 'input',
            name: 'githubAccount',
            message: 'GitHub Username or Organization'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: ''
        },
        {
            type: 'input',
            name: 'homepage',
            message: 'Project Homepage URL'
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'Author\'s Name',
            default: this.user.git.name(),
            store: true
        },
        {
            type: 'input',
            name: 'authorEmail',
            message: 'Author\'s Email',
            default: this.user.git.email(),
            store: true
        },
        {
            type: 'input',
            name: 'authorUrl',
            message: 'Author\'s Homepage',
            store: true
        },
        {
            type: 'list',
            name: 'ci',
            message: 'CI Tool',
            choices: Object.keys(Config.get('CI_OPTIONS')),
            store: true
        }
    ];
}

module.exports = function () {
    this.log(yosay('Backend Node.js@^4.0.0 Module scaffolder'));
    const prompts = getPrompts.call(this);
    return this
        .prompt(prompts)
        .then(function (props) {
            this.props = props;
        }.bind(this));
};
