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
    const content = document.createElement('p');
    content.textContent = `${note.text} ${note.date}`;
    noteElement.appendChild(content);
    noteElement.appendChild(deleteButton(note));
    notes.appendChild(noteElement);
};

const createEvent = (name, detail) => new CustomEvent(name, {bubbles: true, detail});

const deleteButton = note => {
    const button = document.createElement('button');
    button.textContent = 'Borrar';
    button.addEventListener('click', () => {
        button.dispatchEvent(createEvent('remove-note', { note }));
    });
    return button;
};

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    document.body.dispatchEvent(createEvent('add-note', { note: retrieveInput() }));
});

const onAddNote = f => document.body.addEventListener('add-note', e => f(e.detail.note));
const onRemoveNote = f => document.body.addEventListener('remove-note', e => f(e.detail.note));

export { onAddNote, onRemoveNote, showNotes }