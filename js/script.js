(repository => {
    showNotes(repository.get());
    onAddNote(addNote(repository, showNotes));
    onRemoveNote(removeNote(repository, showNotes));
})(repository(localStorage));