const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const db = './db/db.json';
const fs = require('fs');

let noteDatabase = fs.readFileSync('./db/db.json');

// GET Route for retrieving all the tips
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
    res.error('Error in adding Note');
  }
});

notes.delete('api/notes/:id', (req, res) => {
  const id = req.params.id * 1;
  const noteToDelete = noteDatabase.find(el => el.id === id);
  console.log(id);
  console.log(noteToDelete);

  if (!noteDatabase) {
    return res.status(404).json({
      status:'fail',
      message: `No note object with ID ${id} to delete.`
    })
  };

  const index = noteDatabase.indexOf(noteToDelete);
  noteDatabase.splice(index, 1);

  fs.writeFile('./db/db.json', JSON.stringify(noteDatabase), (err) => {
    res.status(204).json({
      status: "success",
      data: {
        newNote: null
      }
    })
  })
});

module.exports = notes;
