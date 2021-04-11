const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [{
    routeName: 'notes',
}]


app.use(express.static(__dirname + '/notes'));
// // app.use(app.router);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/edit', (req, res) => res.sendFile(notes));

app.get('/api/notes/:notes', (req, res) => {
    const selected = req.params.notes;
    console.log(selected);

    for (let i = 0; i < notes.length; i++) {
        if (selected === notes[i].routeName) {
            return res.json(notes[i]);
        }
    }
    return res.json(false);
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    newNote.routeName = newCharacter.name.replace(/\s+/g, '').toUpperCase();
    console.log(newNote);

    notes.push(newNote);
    console.log(newNote);
})


// keep at bottom
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));