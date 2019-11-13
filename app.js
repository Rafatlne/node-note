// const fs = require('fs');
// const getNotes = require('./notes');
// const chalk = require('chalk');
// const log = console.log;

// fs.writeFileSync('notes.txt','my name is: ');
// fs.appendFileSync('notes.txt', 'Rafat');



// const notes = getNotes();
// console.log(getNotes());

// let string = "Success";
// log(chalk.green.inverse.bold(string));
const notes = require('./notes');
const yargs = require('yargs');
const log = console.log;
yargs.version('1.1.0');

// Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note a title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Describe the title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Delete Command
yargs.command({
    command: "remove",
    describe: "removes a title",
    builder: {
        title: {
            describe: 'remove a title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }

});

// list notes
yargs.command({
    command: 'list',
    describe: 'Printing all titles',
    handler(){
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'give a title',
    builder: {
        title: {
            describe: 'read a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()