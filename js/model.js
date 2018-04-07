class Note {
    constructor(text, date) {
        this._text = text;
        this._date = date;
    }

    get text() {
        return this._text;
    }

    get date() {
        return this._date;
    }

    equals(note) {
        return this.text === note.text && this.date === note.date;
    }

    toJson() {
        return {text: this._text, date: this._date};
    }
}