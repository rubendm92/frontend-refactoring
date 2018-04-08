const addNote = (repository, reload) => note => {
    if (note.text && note.date) {
        repository.add(note);
        reload(repository.get());
    }
};

const removeNote = (repository, reload) => note => {
    repository.remove(note);
    reload(repository.get());
};

module.exports = { addNote, removeNote };