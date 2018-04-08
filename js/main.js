import { addNote, removeNote } from './actions';
import repository from './persistence';
import { onAddNote, onRemoveNote, showNotes } from './view';

import '../scss/main.scss';

(repository => {
    showNotes(repository.get());
    onAddNote(addNote(repository, showNotes));
    onRemoveNote(removeNote(repository, showNotes));
})(repository(localStorage));