const express = require('express');
const router = express.Router();
const Students = require('../models/student');
const validate = require('../validators/testStudentInfo');

//POST router
router.post('/', async (req, res) => {
    if (!validate.testMail(req.body.mail)) 
        return returnJson(res, false, 400, 'Invalid email!');
    if (!validate.testPhone(req.body.phone)) 
        return returnJson(res, false, 400, 'Invalid phone number!');
    if (!validate.testFace(req.body.facebook)) 
        return returnJson(res, false, 400, 'Invalid facebook url!');
    if (!validate.testName(req.body.name)) 
        return returnJson(res, false, 400, 'Invalid name!');
    if (!validate.testStudentCode(req.body.studentCode)) 
        return returnJson(res, false, 400, 'Invalid student code!');

    if ((await Students.find({mail: req.body.mail})).length) 
        return returnJson(res, false, 400, 'Email has been used!');
    if ((await Students.find({phone: req.body.phone})).length) 
        return returnJson(res, false, 400, 'Phone number has been used!');
    if ((await Students.find({studentCode: req.body.studentCode})).length) 
        return returnJson(res, false, 400, 'Student code has been used!');

    let student = new Students({
        mail: req.body.mail,
        phone: req.body.phone,
        facebook: req.body.facebook,
        name: req.body.name,
        studentCode: req.body.studentCode
    });
    try {
        let result = await student.save();
        res.json({
            success: true,
            status: {
                code: 200,
                message: 'Registered successfully!'
            }
        })
    }
    catch(e) {
        returnJson(res, false, 400, 'Registered failed!');
    }
});

//Return json
function returnJson(res, success, code, message) {
    return res.json({
        success: success,
        error: {
            code: code,
            message: message
        }
    });
}

module.exports = router;
