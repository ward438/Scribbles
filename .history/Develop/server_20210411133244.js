const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');
const url = require('url');
const uuid = require('uuid');
// let obj = JSON.parse(fs.readFileSync('file', 'utf8'));

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(/api/notes);

const notes = [{
    routeName: 'notes',
}]

function getDatabaseData() {
    let jsonData = fs.readFileSync(`./db/db.json`, 'utf8');
    return JSON.parse(jsonData);
};

function writeDatabaseData(data) {
    return fs.writeFileSync(`./db/db.json`, JSON.stringify(data, null, 4), 'utf8');
};

app.use(express.static(__dirname + '/'));
// // app.use(app.router);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes.html', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/edit', (req, res) => res.sendFile(notes));

app.delete('/api/notes/:id', (req, res) => {
    const selected = req.params.id;
    let database = getDatabaseData().filter(record => record.id != selected);
    writeDatabaseData(database);
    return res.json();
})

app.get('/api/notes/:id', (req, res) => {
    const selected = req.params.id;
    console.log(selected);

    for (let i = 0; i < notes.length; i++) {
        if (selected === notes[i].routeName) {
            return res.json(notes[i]);
        }
    }
    return res.json(false);
})
app.get('/api/notes', (req, res) => {
    return res.json(getDatabaseData());
})
app.post('/api/notes', (req, res) => {
    let noteObject = req.body;
    noteObject.id = uuid.v4();
    let existingDatabase = getDatabaseData();
    existingDatabase.push(noteObject);
    writeDatabaseData(existingDatabase);
    return res.json(false);
})

// console.log(getDatabaseData());

// keep at bottom
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));