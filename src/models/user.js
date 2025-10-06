const mongoose = require('mongoose');  
const validator = require('validator'); 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 30
    },
    lastName: { 
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email ID: ' + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error('Enter a strong Password: ' + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if(!['male', 'female', 'other'].includees(value.toLowerCase())){
                throw new Error('Gender must be male, female or other');
            }    
        }
    },
    photoUrl: {
        type: String,
        default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png', // Default profile picture
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error('Invalid URL: ' + value);
            }
        }
    },
    about: {
        type: String,
        default: 'Hello! I am using DevTinder.' 
    },
    skills: {
        type: [String] // Array of strings
    }
}, { timestamps: true } // Automatically creates createdAt and updatedAt fields);
);

const User = mongoose.model('User', userSchema); // users is the name of the collection

module.exports = User;