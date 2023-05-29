const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

app.listen(PORT,
    () => console.log(`server is running on ${PORT}`));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
    );


app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/notes.html'))
  );
