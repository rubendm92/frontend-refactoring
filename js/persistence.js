export default storage => {
    const get = () => storage.notes ? JSON.parse(storage.notes) : [];

    const add = note => storage.notes = JSON.stringify([...get(), note]);

    const remove = note => {
        storage.notes = JSON.stringify(get().filter(n => !equals(n, note)));
    };

    const equals = (l, r) => l.text === r.text && l.date === r.date;

    return { get, add, remove };
};