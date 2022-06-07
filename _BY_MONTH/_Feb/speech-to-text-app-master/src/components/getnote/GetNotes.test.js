import { GetNotes } from './GetNotes';

describe('GetNotes', () => {
    it('should retrieve from sessionStorage', () => {
        const sessionStorageMock = {
            getItem: jest.fn()
        }
        const dateTime = 'note-' + new Date();
        const note = 'note';
        sessionStorageMock.getItem(dateTime, note)
        expect(sessionStorageMock.getItem).toBeCalledWith(dateTime, note)
    })
})
