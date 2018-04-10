function retrieveInput() {
    return {
        text: document.getElementById('note_input').value,
        date: document.getElementById('date_input').value
    };
}

function clearNotes() {
    const notes = document.getElementById('notes');
    while (notes.firstChild) {
        notes.removeChild(notes.firstChild);
    }
}

function showNotes(notes) {
    clearNotes();
    notes.forEach(showNote);
}

function showNote(note) {
    const notes = document.getElementById('notes');
    const noteElement = document.createElement('li');
    const content = document.createElement('note-element');
    content.setAttribute('content', `${note.text} ${note.date}`);
    content.addEventListener('remove-note', () => content.dispatchEvent(new CustomEvent('remove-note', {bubbles: true, detail: { note }})));
    noteElement.appendChild(content);
    notes.appendChild(noteElement);
}

function onAddNote(f) {
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        f(retrieveInput());
    });
}

function onRemoveNote(f) {
    document.body.addEventListener('remove-note', e => f(e.detail.note));
}

export { onAddNote, onRemoveNote, showNotes };