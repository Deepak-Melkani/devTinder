const express = require('express');
const requestRouter = express.Router(); 
const { userAuth } = require('../middlewares/auth');
const { connection } = require('mongoose');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');



requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) => {
    try{
        const fromUserId = req.user._id; // Get the logged in user id from the request object, which is added by the userAuth middleware
        const toUserId = req.params.toUserId; // Get the toUserId from the request params
        const status = req.params.status; // Get the status from the request params

        // Checking if the userId is present in the database or its just a random id
        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({message: 'User not found with id ' + toUserId});
        } 

        const allowedStatus = ['interested', 'ignored']; 
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message: 'Invalid status type ' +status}); // Throw an error if the status is not valid, only interested and ignored are allowed 
        }

        // Check if a connection request already exists between the two users to prevent duplicate requests 
        const existingConnectionRequest = await ConnectionRequest.findOne({ // Made it to search fast using compound index in schema
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId} // Check for reverse direction as well
            ]
        }); 

        if(existingConnectionRequest) {
            return res.status(400).json({message: 'Connection request already exists between these users'});
        } 


        const connectionRequest = new ConnectionRequest( {fromUserId, toUserId, status} ); // Create a new connection request instance with the data from the request body
        const data = await connectionRequest.save(); // Save the connection request to the database and store the saved document in data
        res.json({message: req.user.firstName + ' is ' + status + ' in ' + toUser.firstName, data}); // Send a success response
    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        // Things to do => Validate the status, isLoggedIn == toUserId, status should be interested, req id should be valid
        const allowedStatus = ['accepted', 'rejected'];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({mesaage: "status not allowed"});
        }

        // Find connection request where the logged-in user is the recipient
        const connectionRequest = await ConnectionRequest.findOne({_id: requestId, toUserId: loggedInUser._id, status: 'interested'});
        if(!connectionRequest) {
            return res.status(404).json({message: 'Connection request not found'});
        }

        // Update status and save
        connectionRequest.status = status;
        const data = await connectionRequest.save();

        // Respond with success
        res.json({message: 'Connection request ' + status, data});

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});

module.exports = requestRouter;