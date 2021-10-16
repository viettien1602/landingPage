const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Students = require('../models/student');

router.get('/', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) 
        return res.json({
            step: 1
        });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) 
            return res.json({
                step: 1
            });
        let student = await Students.findOne({email: data.email});
        res.json({
            step: student.step
        });
    });
});

module.exports = router;
