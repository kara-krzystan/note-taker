const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allNotes = require('./db/db');

app.get('/api/notes', (req, res) => {
    res.json(allNotes);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});