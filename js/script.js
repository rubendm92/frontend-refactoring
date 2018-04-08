const getNotes = () => {
    return localStorage.notes ? JSON.parse(localStorage.notes) : [];
};

const storeNote = note => {
    const notes = [...getNotes(), note];
    localStorage.notes = JSON.stringify(notes);
};

const removeNote = note => {
    localStorage.notes = JSON.stringify(getNotes().filter(n => !equals(n, note)));
};

const equals = (l, r) => {
    return l.text === r.text && l.date === r.date;
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
        addNote({text, date});
    }
});