'use strict';

const rewire = require('rewire');
const expect = require('chai').expect;

const extension = rewire('../../generators/app/extensions/default');

describe('Unit Test for createDirIfNotExists', function () {
    it('CASE 1: Works correctly when currentPath is the moduleName', function () {
        const func = extension.__get__('createDirIfNotExists').bind({
            destinationPath: function () {
                return 'hello';
            },
            props: {
                moduleName: 'hello'
            }
        });

        expect(func()).to.be.eql(undefined);
    });
});
