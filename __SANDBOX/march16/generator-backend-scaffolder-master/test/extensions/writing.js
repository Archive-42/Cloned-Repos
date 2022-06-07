'use strict';

const rewire = require('rewire');
const expect = require('chai').expect;

const Config = require('../../generators/app/config');
const extension = rewire('../../generators/app/extensions/writing');

describe('Unit Test for getCopyFiles', function () {
    it('CASE 1: Works correctly when additionalFiles is undefined', function () {
        const expectedResult = Config.get().DEFAULT_FILES;
        const output = extension.__get__('getCopyFiles')();

        expect(output).to.deep.eql(expectedResult);
    });
});
