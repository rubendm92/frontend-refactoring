class NoteBook {
    constructor(page) {
        this._page = page;
    }

    async publishNote(text, date) {
        await this._page.fill('#note_input', text);
        await this._page.fill('#date_input', date);
        await this._page.click('input[type="submit"]');
    };

    async deleteNote(content) {
        // Deletes the first note since picking the right one seems difficult now
        await this._page.hover('note-element');
        await this._page.click('note-element > button');
    };

    async noteExists(content) {
        await this._page.elementPresent('note-element');
        await this._page.elementHasText('note-element > p', content);
    };

    async noteDoesNotExist(content) {
        await this._page.elementNotPresent('note-element', content);
    };

    async refresh() {
        await this._page.refresh();
    }
}

module.exports = NoteBook;