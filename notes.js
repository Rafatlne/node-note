const log = console.log;
const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    let message = "getNotes called";
    return message;
};

// Add notes
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    debugger
    if (!duplicateNote) {
        notes.push({
            'title': title,
            'body': body
        });

        saveNotes(notes);
        log(chalk.green.inverse('Note has been saved'));
    } else {
        log(chalk.red.inverse('Duplicate Title'));
    }
};

//remove title
const removeNote = (title) => {
    const notes = loadNotes();
    const index = notes.findIndex(note => note.title === title);

    if (index !== undefined && index !== -1) {
        notes.splice(index, 1);
        saveNotes(notes);
        log(chalk.green.inverse(title + ' has been deleted'));
    } else {
        log(chalk.red.inverse('no title found by this title name'));
    }

}

//list title
const listNotes = () => {
    const notes = loadNotes();
    log(chalk.white.inverse("Your titles"));
    notes.forEach(note => {
        log(chalk.green.inverse("Title: " + note.title));
    });
}

//Read Tittle
const readNote = (title) => {
    const notes = loadNotes();
    const readNote = notes.find(note => note.title === title);

    if(readNote){
        log(chalk.white.inverse('Title: ' + readNote.title));
        log('Body: ' + readNote.body);
    }else{
        log(chalk.red.inverse('No note found'));
    }
    
}

//Save notes
const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJson);
};

//Load notes from json
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch {
        return [];
    }

};

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
};