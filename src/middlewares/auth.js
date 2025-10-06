const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next) => {
    // Middleware function to authenticate user using JWT token, first read the token from req cookies, validate the token, then find if the user exists in the database, if everything is valid, call next() to proceed to the next middleware or route handler, otherwise send an error response

    try{// Step1 --> Read thre token
    const {token} = req.cookies; 
    if(!token) {
        throw new Error('No token found or invalid token'); // Throw an error if no token is found
    }

    // Step2 --> Validate the token
    const decodedObj = await jwt.verify(token, 'Dev@Tinder$777'); // Verify the token using the same secret key used to sign it
    const {userId} = decodedObj; // Destructure the userId from the decoded object 
    const user = await User.findById(userId); // Find the user by userId
    if(!user) {
        throw new Error('User not found'); // Throw an error if the user is not found
    }

    req.user = user; // Attach the user object to the request object for use in subsequent middleware or route handlers
    next(); // Call next() to proceed to the next middleware or route handler
    }catch(err) {
        res.status(400).send('ERROR: ' + err.message); // Send an error response if the token is invalid or user not found
    }

};



module.exports = { userAuth };