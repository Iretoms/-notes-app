//console.log('starting app.js');

const fs = require('fs');
const _ = require('lodash')
const yargs= require('yargs')

const notes= require('./notes.js')
const titleOption={
  describe:'Title of note',
  demand:true,
  alias:'t'
}

let argv = yargs
.command('add','Adding new note',{
  title:titleOption,
  body:{
    describe:'Body of note',
    demand:true,
    alias:'b'
  }
})
.command('list','Listing all notes')
.command('read','Reading the note', {
  title:titleOption
})
.command('remove','Removing note',{
  title:titleOption
})
.help()
.argv

let command= argv._[0]


//console.log('Command:',command);
//console.log('yargs', argv);
// add note
 if (command==='add') {
  let note=notes.addNote(argv.title,argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note)
  } else {
    console.log('This note already exists')
  }
}
//list note
else if (command==='list') {
let allNote=  notes.getAll()
console.log(`printing ${allNote.length} note(s).`);
allNote.forEach((note)=>notes.logNote(note))
}
//find note
else if (command==='read') {
   let note= notes.getNote(argv.title);
   if (note) {
     console.log('Note found');
     notes.logNote(note)

   } else {
     console.log('Note not found');
   }
}
//remove note
else if (command=== 'remove') {
  let noteRemoved=notes.removeNote(argv.title)
  let message = noteRemoved ? 'Note removed':'Note not found'
  console.log(message);
}
else{
  console.log('Command not recognised');
}
