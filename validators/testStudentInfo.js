function testMail(mail) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(mail);
}

function testPhone(phone) {
    let phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
}

function testFace(face) {
    let facePattern = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
    return facePattern.test(face);
}

function testName(name) {
    let namePattern = /^[a-zàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹý ,.'-]+$/i;
    return namePattern.test(name);
}

function testStudentCode(code) {
    let codePattern = /^[a-z]{2}[0-9]{6}$/i;
    return codePattern.test(code);
}

module.exports = {
    testMail,
    testPhone,
    testFace,
    testName,
    testStudentCode
}