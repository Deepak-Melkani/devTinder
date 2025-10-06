const express = require('express');
const profileRouter  = express.Router();
const { userAuth } = require('../middlewares/auth');

profileRouter.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user; // Get the user from the request object
       
        res.send(user); // Send the user details as the response

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message); // Send an error response if something goes wrong
    }
});

module.exports = profileRouter;