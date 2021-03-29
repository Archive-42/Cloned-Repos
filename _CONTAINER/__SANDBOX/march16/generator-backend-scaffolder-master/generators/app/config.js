'use strict';

module.exports.get = function (specific) {
    const config = {
        DEFAULT_FILES: [
            '.editorconfig',
            '.eslintignore',
            '.gitignore',
            '.istanbul.yml',
            'test'
        ],

        CI_OPTIONS: {
            'CircleCI': 'circle.yml',
            'TravisCI': '.travis.yml',
            'I do not want a CI Tool': ''
        }
    };

    if (specific) {
        return config[specific];
    }
    return config;
};
