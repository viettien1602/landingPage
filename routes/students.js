const express = require('express');
const router = express.Router();
const Students = require('../models/student');
const validate = require('../validators/testStudentInfo');

//POST router
router.post('/', async (req, res) => {
    if (!validate.testMail(req.body.mail)) 
        return res.status(400).send('Invalid email.');
    if (!validate.testPhone(req.body.phone)) 
        return res.status(400).send('Invalid phone number.');
    if (!validate.testFace(req.body.facebook)) 
        return res.status(400).send('Invalid facebook.');
    if (!validate.testName(req.body.name)) 
        return res.status(400).send('Invalid name.');
    if (!validate.testStudentCode(req.body.studentCode)) 
        return res.status(400).send('Invalid student code.');

    if ((await Students.find({mail: req.body.mail})).length) 
        return res.status(400).send('Email has been used.');
    if ((await Students.find({phone: req.body.phone})).length) 
        return res.status(400).send('Phone number has been used.');
    if ((await Students.find({studentCode: req.body.studentCode})).length) 
        return res.status(400).send('Student code has been used.');

    let student = new Students({
        mail: req.body.mail,
        phone: req.body.phone,
        facebook: req.body.facebook,
        name: req.body.name,
        studentCode: req.body.studentCode
    });
    try {
        let result = await student.save();
        res.send('Registered successfully.');
    }
    catch(e) {
        res.status(400).send(e.errors);
    }
});
module.exports = router;
