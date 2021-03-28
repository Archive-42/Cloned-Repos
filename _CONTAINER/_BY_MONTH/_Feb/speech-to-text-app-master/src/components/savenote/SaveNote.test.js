import {SaveNote} from './SaveNote';

describe('SaveNote', () => {
    it('should save to sessionStorage', () => {
        const sessionStorageMock = {
            setItem: jest.fn()
        }
        const dateTime = 'note-' + new Date();
        const note = 'note';
        sessionStorageMock.setItem(dateTime, note)
        expect(sessionStorageMock.setItem).toBeCalledWith(dateTime, note)
    });
})

