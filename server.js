const db = require("./db/db.json");
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing (Middleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    db.push(req.body);
    res.json(req.body);
});

app.delete(`/api/notes/${id}`, (req, res) => {
    const id = req.params.id;
    for (let i = o; i < db.length; i++) {
        if (id === db[i].title) {
            app.db('notes').remove({
                id: id
            });
        };
    };

    return res.json(false);
});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));