const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const allNotes = require('./db/db');

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ allNotes: notesArray }, null, 2)
    );
    return newNote;
}

app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = allNotes.length.toString();
    //unique id needed, find package on npm 

    const newNote = createNewNote(req.body, allNotes);
    

    res.json(newNote);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});