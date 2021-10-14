const express = require('express');
const app = express();
const students = require('./routes/students');
const login = require('./routes/loginGG');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/landingPage') 
    .then(() => console.log('Connected to mongoDb.'))
    .catch((e) => console.error('Could not connect to mongoDb.', e));

//Allow access from other port
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(express.json());
app.use('/api/students', students);
app.use('/auth/google', login);
//listen on port
let port = 1000;
app.listen(port, () => {
    console.log('Listen on port ' + port);
});