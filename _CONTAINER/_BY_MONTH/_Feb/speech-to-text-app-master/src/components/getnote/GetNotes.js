export const GetNotes = () => {
    let noteList = [];
    const note = document.getElementById('note');
    for (let i = 0; i < sessionStorage.length; i++) {
        note.innerHTML = `${sessionStorage.key(i)}<li>${sessionStorage.getItem(sessionStorage.key(i))}</li><br>`
        noteList.push(`${note.innerHTML}`);
        const storage = document.getElementById('storage');
        storage.innerHTML = `${noteList.join('')}`;
    }
}