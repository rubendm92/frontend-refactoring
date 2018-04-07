const retrieveInput = () => {
    return {
        text: document.getElementById('note_input').value,
        date: document.getElementById('date_input').value
    };
};