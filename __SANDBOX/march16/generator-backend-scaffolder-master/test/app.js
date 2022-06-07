'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const Config = require('../generators/app/config');

function getPrompts(overrideProperties) {
    return Object.assign({
        moduleName: 'test_module',
        githubAccount: 'user',
        description: 'Test Module',
        homepage: 'https://testmodule.io',
        authorName: 'User',
        authorEmail: 'user@testmodule.io',
        authorUrl: 'https://testmodule.io',
        ci: 'CircleCI',
        license: 'MIT'
    }, overrideProperties);
}

function getFilesToAssert(additionalFiles) {
    const files = Config.get().DEFAULT_FILES;
    if (Array.isArray(additionalFiles)) {
        return files.concat(additionalFiles);
    }
    return files;
}

describe('Integration Tests for generator-backend-scaffolder', function () {
    context('CASE 1: All prompts filled correctly', function () {
        before(function () {
            return helpers
                .run(path.join(__dirname, '../generators/app'))
                .withPrompts(getPrompts())
                .toPromise();
        });

        it('Expected files are generated', function () {
            assert.file(getFilesToAssert(['circle.yml', 'package.json', 'README.md', 'LICENSE']));
        });
    });

    context('CASE 2: projectRoot option set', function () {
        before(function () {
            return helpers
                .run(path.join(__dirname, '../generators/app'))
                .withOptions({projectRoot: 'lib'})
                .withPrompts(getPrompts({
                    moduleName: 'projectRootSet'
                }))
                .toPromise();
        });

        it('Expected files are generated', function () {
            assert.file(getFilesToAssert(['circle.yml', 'package.json', 'README.md', 'LICENSE']));
        });
    });

    context('CASE 3: license option set to false', function () {
        before(function () {
            return helpers
                .run(path.join(__dirname, '../generators/app'))
                .withOptions({license: false})
                .withPrompts(getPrompts({
                    moduleName: 'licenseFalse'
                }))
                .toPromise();
        });

        it('Expected files are generated', function () {
            assert.file(getFilesToAssert(['circle.yml', 'package.json', 'README.md']));
        });
    });
});
