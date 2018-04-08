const addNote = repository => note => {
    if (note.text && note.date) {
        repository.add(note);
    }
};

module.exports = { addNote };