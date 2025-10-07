const express = require('express');
const profileRouter  = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateProfileData } = require('../utils/validation');

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user; // Get the user from the request object
       
        res.send(user); // Send the user details as the response

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message); // Send an error response if something goes wrong
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if(!validateProfileData(req)) { // Call the validateProfileData function to validate the request body from utils/validation.js
            throw new Error('Invalid updates!'); 
        } 

        const loggedInUser = req.user; // Get the user from the request object
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]); // Update the user fields with the data from request body
        await loggedInUser.save(); // Save the updated user to the database
        res.json({'message':'Profile Updated Successfully', data: loggedInUser}); // Send a success response

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message); // Send an error response if something goes wrong
    }
});

profileRouter.patch('/profile/forgot-password', userAuth, async (req, res) => {
    try {

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message); // Send an error response if something goes wrong
    }
}); 

module.exports = profileRouter;