export default storage => {
    function get() {
        return storage.notes ? JSON.parse(storage.notes) : [];
    }

    function add(note) {
        storage.notes = JSON.stringify([...get(), note]);
    }

    function remove(note) {
        storage.notes = JSON.stringify(get().filter(n => !equals(n, note)));
    }

    function equals(l, r) {
        return l.text === r.text && l.date === r.date;
    }

    return { get, add, remove };
};