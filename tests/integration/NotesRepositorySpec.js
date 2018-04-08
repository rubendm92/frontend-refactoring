import serve from 'serve';
import browser from '../lib/Browser';
import { expect } from 'chai';
const port = 8000;
const _ = f => browser(`http://localhost:${port}/tests/integration/fixture.html`)(page => f(page));

let server;

describe('Repository', function() {

    before(done => {
        server = serve('.', { port });
        setTimeout(done, 1000);
    });

    it('can store and remove notes from the localStorage', _(async page => {
        let notes = await page.execute(() => repository(localStorage).get());
        expect(notes).to.be.empty;

        await page.execute(() => repository(localStorage).add({text: 'Hello', date: '1992-06-22'}));
        await page.execute(() => repository(localStorage).add({text: 'Bye', date: '2092-06-22'}));

        notes = await page.execute(() => repository(localStorage).get());
        expect(notes).to.deep.equal([
            {text: 'Hello', date: '1992-06-22'},
            {text: 'Bye', date: '2092-06-22'}
        ]);

        await page.execute(() => repository(localStorage).remove({text: 'Hello', date: '1992-06-22'}));

        notes = await page.execute(() => repository(localStorage).get());
        expect(notes).to.deep.equal([ {text: 'Bye', date: '2092-06-22'} ]);
    }));

    after(() => server.stop());
});
