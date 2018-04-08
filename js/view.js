const retrieveInput = () => {
    return {
        text: document.getElementById('note_input').value,
        date: document.getElementById('date_input').value
    };
};

const showNote = (note, removeNote) => {
    const notes = document.getElementById('notes');
    const noteElement = document.createElement('li');
    const content = document.createElement('p');
    content.textContent = `${note.text} ${note.date}`;
    noteElement.appendChild(content);
    noteElement.appendChild(deleteButton(note, removeNote));
    notes.appendChild(noteElement);
};

const deleteButton = (note, removeNote) => {
    const button = document.createElement('button');
    button.textContent = 'Borrar';
    button.addEventListener('click', () => {
        button.parentElement.remove();
        removeNote(note);
    });
    return button;
};