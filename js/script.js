const getNotes = () => {
    return localStorage.notes ? JSON.parse(localStorage.notes).map(({text, date}) => new Note(text, date)) : [];
};

const storeNote = note => {
    const notes = [...getNotes(), note];
    localStorage.notes = JSON.stringify(notes.map(n => n.toJson()));
};

const removeNote = note => {
    localStorage.notes = JSON.stringify(getNotes().filter(n => !n.equals(note)).map(n => n.toJson()));
};

function loadNotes() {
    getNotes().forEach(n => showNote(n, removeNote));
}

function addNote(note) {
    storeNote(note);
    showNote(note, removeNote);
}

loadNotes();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const {text, date} = retrieveInput();
    if (!(text === '' || date === '')) {
        addNote(new Note(text, date));
    }
});