const express = require('express');
const authRouter = express.Router(); // Similar to app but for routing, now we'll do authRouter.get, authRouter.post etc

const { validateSignupData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');



authRouter.post('/signup', async (req, res) => {
    try {
        // Validate the signup data
        validateSignupData(req); // Call the validation function to validate the request body from utils/validation.js

        const { firstName, lastName, emailId, password } = req.body; // Destructure the request body to get the user details

        // Hash the password before saving it to the database
        const passwordHash = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        }); // Create a new user instance with the data from the request body
        await user.save(); // Save the user to the database
        res.send('User added successfully'); // Send a success response
    } catch (err) {
        res.status(400).send('ERROR: ' + err.message); // Send an error response if saving fails
    }
});

authRouter.post('/login', async (req, res) =>  {
    try {
        const {emailId, password} = req.body; // Destructure the request body to get emailId and password

        // Write the code to check if the user with the given emailId exists in the database and if its valid
        const user = await User.findOne({ emailId }); // Find the user by emailId
        if(!user) {
            throw new Error('Invalid credentials'); // Throw an error if the user is not found
        }

        // Compare the given password with the hashed password stored in the database using bcrypt.compare
        const isPasswordValid = await user.validatePassword(password); // Compare the given password with the hashed password in the user document, the method validatePassword is defined in the user model
        if(isPasswordValid) {

            // Create a JWT token (Created a method getJWT in user model to create a JWT token for a user instance and return it)
            const token = await user.getJWT(); // Call the getJWT method on the user instance to get the JWT token 

            // Add the token to the cookie and send it to the client
            res.cookie('token', token); // Set a cookie named 'token' with the JWT token, can add expiry and httpOnly flag for security (refer the docs for more options)
            
            res.send('Login successful'); // Send a success response if the password is valid
        } else {
            throw new Error('Invalid credentials'); // Throw an error if the password is invalid
        }

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});



module.exports = authRouter;