const { spy, assert } = require('sinon');
const {addNote} = require('../../js/actions');

describe('Actions', () => {

    describe('Add note', () => {

        let repository, reload;

        beforeEach(() => {
            repository = { add: spy(), get: spy() };
            reload = spy();
        });

        it('should add a note', function () {
            const f = addNote(repository, reload);

            f({text: 'hello', date: '1992-06-22'});

            assert.calledWith(repository.add, {text: 'hello', date: '1992-06-22'});
            assert.called(repository.get);
            assert.called(reload);
        });

        it('should not add a note without text', function () {
            const f = addNote(repository, reload);

            f({text: '', date: '1992-06-22'});

            assert.notCalled(repository.add);
            assert.notCalled(reload);
        });

        it('should not add a note without date', function () {
            const f = addNote(repository, reload);

            f({text: 'hello'});

            assert.notCalled(repository.add);
            assert.notCalled(reload);
        });
    });
});