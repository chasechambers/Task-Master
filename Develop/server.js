const express = require('express');
const path = require('path');
const app = express();
const noteItems = require('./db/db.json')
const PORT = 3001;
const uuid = require('./helpers/uuid');
const { write } = require('fs');

app.listen(PORT,
    () => console.log(`server is running on ${PORT}`));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});


app.get('/api/notes', (req, res) => {
    res.json(`${req.method} request received to get notes`);

   console.info(`${req.method} request received to get notes`)
});



app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        review_id: uuid(),
      };

        fs.writeFile(`./db/db.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
                )
            }
        })
    }
});