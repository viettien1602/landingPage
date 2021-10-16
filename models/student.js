const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true
    },
    step: {
        type: Number,
        required: true
    },
    phone: {
        type: String
    },
    facebook: {
        type: String,
        lowercase: true
    },
    name: {
        type: String,
        uppercase: true
    },
    studentCode: {
        type: String,
        uppercase: true
    }
});

const Students = mongoose.model('Students', studentSchema);

module.exports = Students;