const fs = require('fs');
var fetchNotes= ()=>{
  try {
    var notesString=fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [] ;
  }
};
var saveNotes=(notes)=>{
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};
var logNote= (note)=>{
    console.log("--------");
    console.log("Title:",note.title);
    console.log("Body:",note.body);
};
var addNotes= function (title,body){
    var note={
      title,body
    };
    var notes=fetchNotes();
    var dublicateNotes= notes.filter((note)=>note.title===title);//to create array of dublicate Title
    if(dublicateNotes.length===0){
      notes.push(note);
      saveNotes(notes);
      return note;
    }
}
var getAll= ()=>{
  return fetchNotes();
};
var getNote= function (title){
  var notes=fetchNotes();
  return notes.find((note)=>note.title===title);
};
var removeNote= function (title){
  var notes=fetchNotes();
  var newNotes= notes.filter((note)=>note.title!==title);
  saveNotes(newNotes);
  if(notes.length!==newNotes.length)
  {
    return true;
  }
};
module.exports = {
  addNotes,getAll,getNote,removeNote,logNote
};

// module.exports.age=21;
// module.exports.add=function(a,b){
//   return a+b;
// };
