const mongoose = require('mongoose');  
const validator = require('validator'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the user schema with fields and their validations

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,    // index is used to make the API faster, similar to indexing in books (helps to quickly find), if we use unique property then the index is added itself but in firstName we can't add the attribute unique. but avoid creating index for every field to make searching fast, use only where required since it is complex for database to manage indexing for multiple fields
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
            if(!['male', 'female', 'other'].includes(value.toLowerCase())){
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


userSchema.index({firstName: 1, lastName: 1}); // Optimises the searching in API call if some call is of the form User.find({firstName: 'Akshay', lastName: 'Saini'}), the concept used is compound indexing


// Below are the instance methods or schema methods which can be called on a user instance and we can't use arrow functions here as we need to use 'this' keyword

userSchema.methods.getJWT = async function() {
    const user = this; // 'this' refers to the user document on which the method is called
    const token = await jwt.sign(
                { userId: user._id }, // Payload containing the user ID, which will be encoded in the token  
                'Dev@Tinder$777', // Secret key to sign the token (should be stored in environment variables)
                { expiresIn: '1h' } // Token expiration time
            );
    return token; // Return the generated token
}

userSchema.methods.validatePassword = async function(password)  {
    const user = this; // 'this' refers to the user document on which the method is called
    const passwordHash = user.password; // Get the hashed password from the user document
    const isPasswordValid = await bcrypt.compare(password, passwordHash); // Compare the given password with the hashed password
    return isPasswordValid; // Return the result of the comparison
}

const User = mongoose.model('User', userSchema); // users is the name of the collection

module.exports = User;