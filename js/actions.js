function addNote(repository, reload) {
    return note => {
        if (note.text && note.date) {
            repository.add(note);
            reload(repository.get());
        }
    };
}

function removeNote(repository, reload) {
    return note => {
        repository.remove(note);
        reload(repository.get());
    };
}

export { addNote, removeNote };