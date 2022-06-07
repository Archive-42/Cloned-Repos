import {sessionStorageSupport} from '../utils/storageSupport';

export const SaveNote = () => {
    const note = document.getElementById('final').textContent;
    const notes = document.querySelector('ul.notes');
    const dateTime = `${new Date().toLocaleString().split(',').join(' ')}`;
    notes.innerHTML = ` ${dateTime}:<br> ${note} <br>`;
    // check for session storage
    const storagequotamsg = document.getElementById('storagequota-msg');
    // run detection with inverted expression
    if (!sessionStorageSupport) {
        // change value to inform visitor of no session storage support
        storagequotamsg.innerHTML = 'Sorry. No HTML5 session storage support here.';
    } else {
        try {
            // set interval and autosave every second.
            setInterval(() => {
                sessionStorage.setItem('note-' + dateTime, ' ' + note);
            }, 1000);
        } catch (domException) {
            if (domException.name === 'QUOTA_EXCEEDED_ERR' || domException.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                storagequotamsg.innerHTML = 'Session Storage Quota Exceeded!';
            }
        }
    }
    sessionStorage.setItem('note-' + dateTime, ' ' + note);
}