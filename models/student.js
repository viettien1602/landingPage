const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    mail: {
        type: String,
        lowercase: true,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        lowercase: true,
        required: true
    },
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    studentCode: {
        type: String,
        uppercase: true,
        required: true
    }
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;