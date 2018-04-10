class NoteElement extends HTMLElement {

    connectedCallback() {
        this._p = document.createElement('p');
        this._p.textContent = this._textContent;
        this.appendChild(this._p);
        const button = document.createElement('button');
        button.textContent = 'Borrar';
        button.addEventListener('click', () => this.dispatchEvent(new Event('remove-note')));
        this.appendChild(button);
    }

    static get observedAttributes() {
        return ['content'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'content') {
            this._textContent = newValue;
            if (this._p) {
                this._p.textContent = newValue;
            }
        }
    }
}

customElements.define('note-element', NoteElement);
