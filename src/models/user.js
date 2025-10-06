const mongoose = require('mongoose');   

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
        trim: true
    },
    password: {
        type: String,
        required: true
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
        default: 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png' // Default profile picture
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