


const fs = require('fs');

fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let note = JSON.parse(data);
    console.log(note);
  
});


let newNote = { 
    title: 'Hi',
    note: ""
  
};
 
let data = JSON.stringify(newNote, null, 2);

fs.writeFile('db.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});





