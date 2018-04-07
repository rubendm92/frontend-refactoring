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
        'text': $('#note_input').val(),
        'date': $('#date_input').val()
    };
}

function show_note(note) {
    $('#notes')
        .append($('<li>')
            .append('<p>' + note.text + " " + note.date + '</p>')
            .append(delete_button(note)));
}

function delete_button(note) {
    return $('<button>').on('click', function() {
        $(this).parent().remove();
        remove_note(note);
    }).append("Borrar");
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