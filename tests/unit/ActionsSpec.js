const expect = require('chai').expect;
const {addNote} = require('../../js/actions');

describe('Actions', () => {
    describe('Add note', () => {
        it('should add note to the repository', function () {
            const repository = (() => {
                const notes = [];
                return {
                    add: notes.push.bind(notes),
                    notes: () => notes
                }
            })();
            const f = addNote(repository);

            f({text: 'hello', date: '1992-06-22'});

            expect(repository.notes()).to.deep.equal([
                {text: 'hello', date: '1992-06-22'}
            ]);
        });

        it('should not add a note without text', function () {
            const repository = (() => {
                const notes = [];
                return {
                    add: notes.push.bind(notes),
                    notes: () => notes
                }
            })();
            const f = addNote(repository);

            f({text: '', date: '1992-06-22'});

            expect(repository.notes()).to.be.empty;
        });

        it('should not add a note without date', function () {
            const repository = (() => {
                const notes = [];
                return {
                    add: notes.push.bind(notes),
                    notes: () => notes
                }
            })();
            const f = addNote(repository);

            f({text: 'hello'});

            expect(repository.notes()).to.be.empty;
        });
    });
});