const express = require('express');
const router = express.Router();
const Students = require('../models/student');
const validate = require('../validators/testStudentInfo');

//POST router
router.put('/', async (req, res) => {
    if (!validate.testPhone(req.body.phone)) 
        return returnJson(res, false, 400, 'Invalid phone number!');
    if (!validate.testFace(req.body.facebook)) 
        return returnJson(res, false, 400, 'Invalid facebook url!');
    if (!validate.testName(req.body.name)) 
        return returnJson(res, false, 400, 'Invalid name!');
    if (!validate.testStudentCode(req.body.studentCode)) 
        return returnJson(res, false, 400, 'Invalid student code!');

    let student = (await Students.find({email: req.body.email}))[0];
    if (student.step === 3) 
        return returnJson(res, false, 400, 'Already registered!');
    

    student.phone = req.body.phone;
    student.facebook = req.body.facebook;
    student.name = req.body.name;
    student.studentCode = req.body.studentCode;
    student.step = 3;

    try {
        let result = await student.save();
        res.json({
            success: true,
            status: {
                code: 200,
                message: 'Registered successfully!'
            }
        });
    }
    catch(e) {
        returnJson(res, false, 400, 'Registered failed!');
    }
});

//Return json
function returnJson(res, success, code, message) {
    return res.json({
        success: success,
        status: {
            code: code,
            message: message
        }
    });
}

module.exports = router;
