const retrieveInput = () => {
    return {
        text: document.getElementById('note_input').value,
        date: document.getElementById('date_input').value
    };
};

const showNotes = notes => {
    document.getElementById('notes').innerHTML = '';
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

const deleteButton = note => {
    const button = document.createElement('button');
    button.textContent = 'Borrar';
    button.addEventListener('click', () => {
        button.dispatchEvent(new CustomEvent('remove-note', { bubbles: true, detail: { note: note }}));
    });
    return button;
};

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    document.body.dispatchEvent(new CustomEvent('add-note', { bubbles: true, detail: { note: retrieveInput() } }));
});