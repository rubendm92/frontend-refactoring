const persistence = repository(localStorage);

const reload = notes => showNotes(notes, removeNote(persistence, reload));
const add = addNote(persistence, reload);
reload(persistence.get());

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    add(retrieveInput());
});