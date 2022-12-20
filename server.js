const express = require('express');
const path = require('path');
const api = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;

const app = express();


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use('/api', api);


// GET requests
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


// TO DO:
// 1. html routes (GET) - /notes to note.html and * to index.html
// 2. API routes - GET /api/notes reads db.json and all saved notes
// 2. API routes - POST /api/notes receive new note to save, and to db.json, and return new note

// Bonus - DELETE /api/notes/:id receive query tha contains id of a note to delete.
// Will need to read all notes in db.json and delete selected id, then rewrite notes to db.json