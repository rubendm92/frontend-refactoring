const serve = require('serve');
const browser = require('./Browser');
const NoteBook = require('./NoteBook');
const port = 8000;
const _ = f => browser(`http://localhost:${port}`)(page => f(new NoteBook(page)));
let server;

describe('Notes', function() {

    before(done => {
        server = serve('.', { port });
        setTimeout(done, 1000);
    });

    it('can create a note with a text and a date', _(async noteBook => {
        await noteBook.publishNote('Hello', '1992-06-22');
        await noteBook.noteExists('Hello 1992-06-22');
    }));

    it('notes are stored, so they are present after reload', _(async noteBook => {
        await noteBook.publishNote('Hello', '1992-06-22');
        await noteBook.noteExists('Hello 1992-06-22');

        await noteBook.refresh();

        await noteBook.noteExists('Hello 1992-06-22');
    }));

    it('can create multiple notes', _(async noteBook => {
        await noteBook.publishNote('Hello', '1992-06-22');
        await noteBook.publishNote('Bye', '2092-06-22');

        await noteBook.noteExists('Hello 1992-06-22');
        await noteBook.noteExists('Bye 2092-06-22');
    }));

    it('can delete notes', _(async noteBook => {
        await noteBook.publishNote('Hello', '1992-06-22');
        await noteBook.publishNote('Bye', '2092-06-22');

        await noteBook.noteExists('Hello 1992-06-22');
        await noteBook.noteExists('Bye 2092-06-22');

        await noteBook.deleteNote('Hello 1992-06-22');

        await noteBook.noteDoesNotExist('Hello 1992-06-22');
        await noteBook.noteExists('Bye 2092-06-22');
    }));

    after(() => server.stop());
});
