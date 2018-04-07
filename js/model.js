class Note {
    constructor(text, date) {
        this._text = text;
        this._date = date;
    }

    equals(note) {
        return this._text === note._text && this._date === note._date;
    }

    toString() {
        return `${this._text} ${this._date}`;
    }

    toJson() {
        return {text: this._text, date: this._date};
    }
}