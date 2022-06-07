export function clearAll() {
    sessionStorage.clear();
    const storage = document.getElementById('storage');
    storage.innerHTML = '';
}

export function reset() {
    window.location.reload(true);
}


