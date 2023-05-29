const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.listen(PORT);

app.use(express.static('public'));

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  );

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.get('/db', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });