const retrieveInput = () => {
    return {
        text: document.getElementById('note_input').value,
        date: document.getElementById('date_input').value
    };
};

const clearNotes = () => {
    const notes = document.getElementById('notes');
    while (notes.firstChild) {
        notes.removeChild(notes.firstChild);
    }
};

const showNotes = notes => {
    clearNotes();
    notes.forEach(showNote);
};

const showNote = note => {
    const notes = document.getElementById('notes');
    const noteElement = document.createElement('li');
    const content = document.createElement('note-element');
    content.setAttribute('content', `${note.text} ${note.date}`);
    content.addEventListener('remove-note', () => content.dispatchEvent(new CustomEvent('remove-note', {bubbles: true, detail: { note }})));
    noteElement.appendChild(content);
    notes.appendChild(noteElement);
};

const onAddNote = f => document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    f(retrieveInput());
});
const onRemoveNote = f => document.body.addEventListener('remove-note', e => f(e.detail.note));

export { onAddNote, onRemoveNote, showNotes };