const sum = require('./sum');

describe('sum', () => {
    it('adds 1 + 2 equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
})
