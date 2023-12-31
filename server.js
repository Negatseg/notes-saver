const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// API routes
app.get('/api/notes', (req, res) => {
  //const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')));
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
  newNote.id = generateUniqueId(); // Implement a function to generate a unique ID
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}