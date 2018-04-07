function load_notes() {
    if (localStorage.notes === undefined ) return;
    JSON.parse(localStorage.notes).forEach(show_note);
}

function add_note(note) {
    var notes = localStorage.notes ? JSON.parse(localStorage.notes).map(n => new Note(n.text, n.date)) : [];
    notes.push(note);
    localStorage.notes = JSON.stringify(notes.map(n => n.toJson()));
    show_note(note);
}

function show_note(note) {
    const notes = document.getElementById('notes');
    const noteElement = document.createElement('li');
    const content = document.createElement('p');
    content.textContent = `${note.text} ${note.date}`;
    noteElement.appendChild(content);
    noteElement.appendChild(deleteButton(note));
    notes.appendChild(noteElement);
}

function deleteButton(note) {
    const button = document.createElement('button');
    button.textContent = 'Borrar';
    button.addEventListener('click', () => {
        button.parentElement.remove();
        remove_note(note);
    });
    return button;
}

function remove_note(note_to_remove) {
    const notes = JSON.parse(localStorage.notes)
        .filter(note => !note.equals(note_to_remove));
    localStorage.notes = JSON.stringify(notes);
}

load_notes();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    const {text, date} = retrieveInput();
    if (!(text === '' || date === '')) {
        add_note(new Note(text, date));
    }
});