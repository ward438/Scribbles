const http = require('http');
const path = require('path');
const express = require('express');
const fs = require('fs');
// let obj = JSON.parse(fs.readFileSync('file', 'utf8'));

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [{
    routeName: 'notes',
}]


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
    let data;
    fs.readFile(`./db/db.json`, 'utf8', (err, data) => {
        if (err) console.log(err);
        console.log('data')
        data = JSON.parse(data);
    })
    console.log(data);
    return res.json(data);
})
app.post('/api/notes', (req, res) => {
    let obj;
    fs.readFile(`../Develop/db/db.json`, 'utf8', (err, data) => {
            if (err) console.log(err);
            obj = JSON.parse(data);
        })
        // todo - take in data and add to the db.json file
        // use something to generate the id - probably that uuid library from the otther project
    return res.json();



    // newNote.routeName = newCharacter.name.replace(/\s+/g, '').toUpperCase();
    // console.log(newNote);

    // notes.push(newNote);
    console.log(newNote);
})


// keep at bottom
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));