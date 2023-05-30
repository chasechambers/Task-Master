const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});



// POST Route for a new note
notes.post('/notes', (req, res) => {
  console.log(req.body, 'Post route');

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.err('Error in adding Note');
  }
});

notes.delete('/notes/:id', (req, res) => {

  let notes = JSON.parse(fs.readFileSync('./db/db.json'));

  let id = req.params.id;
  let filteredNote = notes.filter((note) => note.id !== id)

fs.writeFileSync('./db/db.json', JSON.stringify(filteredNote), (err) => {
    if (err) throw err;
})
res.json(filteredNote);
});

module.exports = notes;
