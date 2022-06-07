'use strict';

const Generator = require('yeoman-generator');

const Extension = require('./extensions');

module.exports = Generator.extend({
    constructor: Extension.constructor,
    prompting: Extension.prompting,
    default: Extension.default,
    writing: Extension.writing,
    install: Extension.install
});
