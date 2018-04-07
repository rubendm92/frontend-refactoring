function load_notes() {
    if (localStorage.notes === undefined ) return;
    JSON.parse(localStorage.notes).forEach(show_note);
}

function on_submit() {
    var note = new_note();
    if (note.text === '' || note.date === '') return;
    add_note(note);
}

function add_note(note) {
    var notes = localStorage.notes === undefined ? [] : JSON.parse(localStorage.notes);
    notes.push(note);
    localStorage.notes = JSON.stringify(notes);
    show_note(note);
}

function new_note() {
    return {
        'text': document.getElementById('note_input').value,
        'date': document.getElementById('date_input').value
    };
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
    var notes = JSON.parse(localStorage.notes);
    for (var i = 0; i < notes.length; i++) {
        if (!(notes_are_equals(notes[i], note_to_remove))) continue;
        notes.splice(i, 1);
        break;
    }
    localStorage.notes = JSON.stringify(notes);
}

function notes_are_equals(note1, note2) {
    return note1.text === note2.text && note1.date === note2.date;
}

load_notes();