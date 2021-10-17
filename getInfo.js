const express = require('express');
const app = express();
const students = require('./routes/students');
const login = require('./routes/loginGG');
const getStep = require('./routes/getStep');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const db = 'mongodb+srv://landing:Database1602@cluster0.wwlia.mongodb.net/landingPage';
mongoose.connect(db) 
    .then(() => console.log('Connected to mongoDb.'))
    .catch((e) => console.error('Could not connect to mongoDb.', e));

//Allow access from other port
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use(express.json());
app.use('/auth/google', login);
app.use('/auth/getStep', getStep);
app.use('/api/students', checkToken, students);

//Middleware
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) 
        return res.json({
            success: false,
            status: {
                code: 401,
                message: 'Missing token'
            }
        });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) 
            return res.json({
            success: false,
            status: {
                code: 403,
                message: 'Unauthorized'
            }
        });
        req.body.email = data.email;
        next();
    });
}

//listen on port
let port = 1000;
app.listen(port, () => {
    console.log('Listen on port ' + port);
});