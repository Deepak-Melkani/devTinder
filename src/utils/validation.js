const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body; 

    if(!firstName || !lastName) {
        throw new Error('First name and last name are required');
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error('Invalid email format');
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }
}

const validateProfileData = (req) => {
    const allowedEditFields = ['password', 'age', 'gender', 'photoUrl', 'about', 'skills'];

    const iSUpdateAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    
    return iSUpdateAllowed;
}

module.exports = { validateSignupData, validateProfileData };