const fs=require('fs');
const _ = require('lodash');
const yargs = require( 'yargs');

const notes= require('./notes.js');
var titleOptions={
  describe:'Title of note',
  demand:true,
  alias:'t'
};
var bodyOptions={
  describe:'Body of Node',
  demand:true,
  alias:'b'
}
// configure yards to get proper arguments from command line
const argv=yargs
.command('add','Add a new node',{
  title :titleOptions,
  body :bodyOptions
})
.command('read','Read a node',{
  title :titleOptions
})
.command('remove','Remove a node',{
  title :titleOptions
})
.command('list','List all node')
.help()
.argv;
var command=argv._[0];
console.log("Command used:",command);
if(command==='add'){
  var note=notes.addNotes(argv.title,argv.body);
  if (note) {
    console.log("Note Added");
    notes.logNote(note);
  }
  else {
    console.log("Title Alread taken");
  }
}
else if (command==='list') {
  var listNotes=notes.getAll();
  listNotes.forEach(note => {
    notes.logNote(note);
  });
}
else if (command==='read') {
  var note=notes.getNote(argv.title);
  if (note) {
    console.log("Note Read");
    notes.logNote(note);
  }
  else {
    console.log("Note not Found");
  }
}
else if (command==='remove') {
  var isRemoved=notes.removeNote(argv.title);
  if(isRemoved){
    console.log("Note Removed");
  }
  else {
    console.log("Note not found");
  }
}
else {
  console.log("command not recognised");
}
