//const fs = require('fs');
//fs.writeFileSync('notes.txt','The file is created by nodejs.');
//fs.appendFileSync('notes.txt',' I am appending');
//fs.appendFileSync('noes.txt','I am appending');
//const name = require('./utils');
//console.log(name);
// const add = require('./utils');
// const sum = add(1,2);
// console.log(sum);



const chalk = require('chalk');
const yargs = require('yargs');
const validator = require('validator');
const notes = require('./notes');





//console.log(getNotes());

/*console.log(chalk.green.inverse.bold("Success"));
console.log(validator.isURL("https://sriram.io"));
console.log(validator.isEmail("sriramkk@gmail.com"));
console.log(validator.isEmail("sriramkkgmail.com"));
console.log(validator.isEmail("sriramkk@gmailcom"));
console.log(process.argv[2]);*/




yargs.version('1.1.0');
yargs.command({
    command:'add',
    describe:'Adding a note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'The body of note',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv)=>{
        notes.addNotes(argv.title,argv.body);
    }
})
yargs.command({
    command:'remove',
    describe:'Removing a note',
    builder:{
        title:{
            describe:'Remove note',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv)=>{
        notes.removeNote(argv.title);
    }
})
yargs.command({
    command:'list',
    describe:'Listing notes',
    handler: ()=>{ //handler()
        notes.listNotes();
    }
})
yargs.command({
    command:'read',
    describe:'Reading a note',
    builder:{
        title:{
            describe:'Particular Note Reading',
            demandOption:true,
            type:'string'
        }
    },
    handler:(argv)=>{
        notes.readNote(argv.title);
    }
});
yargs.parse();
//console.log(yargs.argv);
// node --inspect-brk app.js --... while using debugger and go to chrome://inspect