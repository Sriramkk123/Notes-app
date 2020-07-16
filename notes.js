const fs = require('fs');
const { default: chalk } = require('chalk');
const getNotes = ()=>{
    let notes = "Your notes";
    return notes;
    //console.log("Your notes");
}

const addNotes = (title,body) =>
{
    const notes = loadNotes();
    const duplicate = notes.find( (note) => {note.title === title;});
    if(!duplicate)
    {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes);
        console.log("Note added");
    }
    else
    {
        console.log("Title already exists");
    }
}

const saveNotes = (notes) => {
    const stringified = JSON.stringify(notes);
    fs.writeFileSync('notes.json',stringified);
}


const loadNotes = () =>
{
    try{
    const getExistingBuffer = fs.readFileSync('notes.json');
    const getExistingString = getExistingBuffer.toString();
    return JSON.parse(getExistingString);
    }catch(e){
        return [];
    }
    
}

const removeNote = (title) =>
{
        const data = loadNotes();
        const original = data.length;
        const notesToKeep = data.filter((note) => { note.title !== title;});
        const newlength = notesToKeep.length;
        if(newlength === original)
            console.log(chalk.red.bold("No note found"));
        else    
            console.log(chalk.green.bold("Note removed successfully"));
        saveNotes(notesToKeep);
}

const listNotes = () =>{
    const data = loadNotes();
    //console.log("Inside listNotes");
    console.log(chalk.green.inverse("Your Notes"))
    data.forEach(element => {
        console.log(element.title + " and body is: " + element.body);
    });
}

const readNote = (title) =>{
    const notes = loadNotes();
    const found = notes.find( (note) => note.title === title);
    if(found)
    {
        console.log(chalk.green.inverse(found.title) + " " + found.body);
    }
    else
    {
        console.log(chalk.red.bold.inverse("Not Found"));
    }
}
module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
};