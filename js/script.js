const getNotes = () => {
    return localStorage.notes ? JSON.parse(localStorage.notes).map(({text, date}) => new Note(text, date)) : [];
};

const storeNote = note => {
    const notes = [...getNotes(), note];
    localStorage.notes = JSON.stringify(notes.map(n => n.toJson()));
};

const removeNote = note => {
    localStorage.notes = JSON.stringify(getNotes().filter(n => !n.equals(note)));
};

function load_notes() {
    getNotes().forEach(show_note);
}

function add_note(note) {
    storeNote(note);
    show_note(note);
}

function show_note(note) {
    const notes = document.getElementById('notes');
    const noteElement = document.createElement('li');
    const content = document.createElement('p');
    content.textContent = note.toString();
    noteElement.appendChild(content);
    noteElement.appendChild(deleteButton(note));
    notes.appendChild(noteElement);
}

function deleteButton(note) {
    const button = document.createElement('button');
    button.textContent = 'Borrar';
    button.addEventListener('click', () => {
        button.parentElement.remove();
        removeNote(note);
    });
    return button;
}

load_notes();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const {text, date} = retrieveInput();
    if (!(text === '' || date === '')) {
        add_note(new Note(text, date));
    }
});