const db = require("./db/db.json");
const express = require('express');
const path = require('path');
const fs = require("fs");
const util = require("util");
const { stringify } = require("querystring");
const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);
var uuidv1 = require('uuidv1');
const { log } = require("console");



// Sets up the Express App
const app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing (Middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


app.get('/api/notes', (req, res) => {
    readfile("db/db.json", "utf8").then(data => {
        //console.log(data);
        return res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    readfile("db/db.json", "utf8").then(data => {

        return data;
    }).then(data => {
        let id = uuidv1();
        let newNote = {
            "title": req.body.title,
            "text": req.body.text,
            "id": id
        }
        let dbArray = JSON.parse(data) || [];
        //console.log(dbArray);
        dbArray.push(newNote);
        writefile("db/db.json", JSON.stringify(dbArray)).then(data => {

            return res.json(data);
        });
    })

});

app.delete(`/api/notes/:id`, (req, res) => {
    const id = req.params.id;

    readfile("db/db.json", "utf8").then(data => {

        return data;
    }).then(note => {
        let noteArry = JSON.parse(note);
        return noteArry.filter((item) => {
            return item.id != id;
        })
    }).then(filteredArray => {
       return writefile("db/db.json", JSON.stringify(filteredArray))
    }).then(()=>{
        res.json(true);
    })
});


app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));