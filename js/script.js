const r = repository(localStorage);

const reload = notes => showNotes(notes, removeNote(r, reload));

reload(r.get());

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    addNote(r, reload)(retrieveInput());
});