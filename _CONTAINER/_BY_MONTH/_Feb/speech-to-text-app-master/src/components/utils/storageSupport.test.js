import {sessionStorageSupport} from './storageSupport';

describe('sessionStorageSupport', () => {
    it('the Storage object should not return undefined', () => {
        expect(typeof 'Storage').not.toBe('undefined');
    })
})
