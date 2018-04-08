import { spy, assert } from 'sinon';
import { addNote, removeNote } from '../../js/actions';

describe('Actions', () => {

    let repository, reload;

    beforeEach(() => {
        repository = { add: spy(), get: spy(), remove: spy() };
        reload = spy();
    });

    describe('Add note', () => {

        it('should add a note', () => {
            const f = addNote(repository, reload);

            f({text: 'hello', date: '1992-06-22'});

            assert.calledWith(repository.add, {text: 'hello', date: '1992-06-22'});
            assert.called(repository.get);
            assert.called(reload);
        });

        it('should not add a note without text', () => {
            const f = addNote(repository, reload);

            f({text: '', date: '1992-06-22'});

            assert.notCalled(repository.add);
            assert.notCalled(reload);
        });

        it('should not add a note without date', () => {
            const f = addNote(repository, reload);

            f({text: 'hello'});

            assert.notCalled(repository.add);
            assert.notCalled(reload);
        });
    });

    describe('Remove note', () => {
        it('should remove a note', () => {
            const add = addNote(repository, reload);
            const remove = removeNote(repository, reload);

            add({text: 'hello', date: '1992-06-22'});
            assert.calledWith(repository.add, {text: 'hello', date: '1992-06-22'});
            assert.called(reload);

            remove({text: 'hello', date: '1992-06-22'});
            assert.calledWith(repository.remove, {text: 'hello', date: '1992-06-22'});
            assert.called(reload);
        });
    });
});