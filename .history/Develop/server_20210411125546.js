const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');
const url = require('url');
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

// function postDatabaseData() {
//     let data;
//     let jsonData = fs.writeFileSync(`./db/db.json`, data);
//     return JSON.parse(jsonData);


// let dbData = getDatabaseData();
// let enterJsonData = JSON.stringify(dbData);
// let written = fs.writeFile(`./db/db.json`, enterJsonData, getDatabaseData());
// return JSON.parse(written);
// };


app.use(express.static(__dirname + '/'));
// // app.use(app.router);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes.html', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/edit', (req, res) => res.sendFile(notes));

app.delete('/api/notes/:id', (req, res) => {
    const selected = req.params.id;
    console.log(selected);
    // todo - remove item from the db.json
    return res.json(false);
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
    let body = "";
    filePath = __dirname + './db/db.json';
    request.on('data', function(data) {
        body += data;
    })
    request.on('end', function() {
        fs.appendFile(filePath, body, function() {
            RTCIceTransportStateChangedEvent.end();
        })
    })

    // todo - create a note object from input
    // use something to generate the id - probably that uuid library from the otther project
    // add to the database file
    // return res.json(<new_note_obj>)
    // console.log(enterDbdata);

    // // return enterDbdata;
    // return res.json();



    // newNote.routeName = newCharacter.name.replace(/\s+/g, '').toUpperCase();
    // console.log(newNote);

    // notes.push(newNote);
    console.log(newNote);
})

// console.log(getDatabaseData());

// keep at bottom
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));