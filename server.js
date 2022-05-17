const express = require('express');
const path = require('path')
const fs = require('fs')

const { notes } = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'));

function createNewNote(body, noteArray) {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ note: noteArray }, null, 2)
    );
    return newNote;
};

function findById(id, noteArray) {
    const result = noteArray.filter(note => note.id === id)[0];
    return result;
};

function deleteNote(id, noteArray) {
    for (let i = 0; i < noteArray.length; i++) {
        let note = noteArray[i];

        if (note.id === id) {
            noteArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(noteArray, null, 2)
            );

            break;
        }
    }
}



require("./routing/html-routes")(app);
require("./routing/api-routes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});