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
        await this._page.hover('li');
        await this._page.click('li > button');
    };

    async noteExists(content) {
        await this._page.elementPresent('li');
        await this._page.elementHasText('li > p', content);
    };

    async noteDoesNotExist(content) {
        await this._page.elementNotPresent('li', content);
    };

    async refresh() {
        await this._page.refresh();
    }
}

module.exports = NoteBook;