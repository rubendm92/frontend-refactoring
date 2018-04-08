const expect = require('chai').expect;
const {addNote} = require('../../js/actions');

describe('Actions', () => {

    describe('Add note', () => {

        let repository;

        beforeEach(() => {
            repository = (() => {
                const notes = [];
                return {
                    add: notes.push.bind(notes),
                    get: () => notes
                }
            })();
        });

        it('should add note to the repository', function () {
            const f = addNote(repository);

            f({text: 'hello', date: '1992-06-22'});

            expect(repository.get()).to.deep.equal([
                {text: 'hello', date: '1992-06-22'}
            ]);
        });

        it('should not add a note without text', function () {
            const f = addNote(repository);

            f({text: '', date: '1992-06-22'});

            expect(repository.get()).to.be.empty;
        });

        it('should not add a note without date', function () {
            const f = addNote(repository);

            f({text: 'hello'});

            expect(repository.get()).to.be.empty;
        });
    });
});