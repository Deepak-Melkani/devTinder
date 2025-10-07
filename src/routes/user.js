const express = require('express');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const {userAuth} = require('../middlewares/auth');
const User = require('../models/user')

const USER_SAFE_DATA = "firstName lastName age about"; // For easy use in populate 


// Get all the pending connection requests for the loggedIn user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({toUserId: loggedInUser._id, status: 'interested'}).populate("fromUserId", "firstName lastName age gender skills about"); // ref and populate in mongoDB are similar to joins in sql

        res.json({message: "Data fetched successfully", data: connectionRequests});

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});



userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: 'accepted'},
                {fromUserId: loggedInUser._id, status: 'accepted'}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) { // Used toString method, alternative is to use .equals since strict equality(===) do not works for ids 
                return row.toUserId;
            }
            return row.fromUserId;
        });


        res.json({data});

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});



userRouter.get('/user/feed', userAuth, async(req, res) => {
    try {
        // User should see all the cards except his own, his conections, ignored people, already sent the connection request

        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;        // For pagination
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        //Find all the connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or: [ {fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}, ]
        }).select("fromUserId toUserId");


        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                 {_id: {$nin: Array.from(hideUsersFromFeed)}},
                 {_id: {$ne: loggedInUser._id}}
                ]}).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);

    }catch(err) {
        res.status(400).send('ERROR: ' + err.message);
    }
});

module.exports = userRouter;