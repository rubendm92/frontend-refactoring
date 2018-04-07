const serve = require('serve');
const browser = require('./Browser');
const NoteBook = require('./NoteBook');

describe('Notes', function() {
    const port = 8000;
    const _ = f => browser(`http://localhost:${port}`)(page => f(new NoteBook(page)));
    let server;
    
    before(done => {
        server = serve('.', { port });
        setTimeout(done, 1000);
    });

    it('can create a note with a text and a date', _(async noteBook => {
        await noteBook.publishNote('Hello', '22/06/1992');
        await noteBook.noteExists('Hello 1992-06-22');
    }));

    after(() => server.stop());
});
