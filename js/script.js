(repository => {
    const add = addNote(repository, showNotes);
    const remove = removeNote(repository, showNotes);
    showNotes(repository.get());
    document.body.addEventListener('add-note', e => add(e.detail.note));
    document.body.addEventListener('remove-note', e => remove(e.detail.note));
})(repository(localStorage));