export default storage => {
    const get = () => {
        return storage.notes ? JSON.parse(storage.notes) : [];
    };

    const add = note => {
        const notes = [...get(), note];
        storage.notes = JSON.stringify(notes);
    };

    const remove = note => {
        localStorage.notes = JSON.stringify(get().filter(n => !equals(n, note)));
    };

    const equals = (l, r) => {
        return l.text === r.text && l.date === r.date;
    };

    return { get, add, remove };
};