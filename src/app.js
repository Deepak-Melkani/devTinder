const express = require('express');
const connectDB = require('./config/database');  
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(cookieParser()); // Middleware to parse cookies from the request

app.use(express.json()); // Middleware to parse JSON bodies, enabling us to access the content of the request body

const authRouter = require('./routes/auth'); // Import the auth router to handle authentication routes
const profileRouter = require('./routes/profile'); // Import the profile router to handle profile routes
const requestRouter = require('./routes/requests'); // Import the requests router to handle connection request routes

app.use('/', authRouter); // Use the auth router for routes starting with /auth
app.use('/', profileRouter); // Use the profile router for routes starting with /user
app.use('/', requestRouter); // Use the requests router for routes starting with /requests

// Pushing the data to the database using a POST request
// app.post('/signup', async (req, res) => {
//     const user = new User({     // Creating a new user instance of the User model
//         firstName: 'Harshit',
//         lastName: 'Pandey',
//         emailId: 'harshit.pandey@example.com', 
//         password: 'harshit123'
//     });

//     try{
//         await user.save();
//         res.send('User added successfully'); 
//     } catch(err){
//         res.status(400).send('Error in saving the user');
//     }
// });


// Don't directly use the req body as the attacker can send any data in the body which can break our application
// Always validate the data before using it
// Encrypt the password before saving it to the database using bcryptjs or any other library

















// Get user by emailId
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId; // Get the emailId from the request body
    try {
        const user = await User.find({ emailId: userEmail }); // Find the user by emailId
        if(user.length === 0){
            res.status(404).send('User not found'); // Send a 404 response if the user is not found
        }
        else {
            res.send(user); // Send the user data as the response
        }
        
    } catch (err) {
        res.status(400).send('Something went wrong'); // Send an error response if the query fails
    }
});

// Feed API - GET /feed - get all the users from the database
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users); // Send all users as the response
    }
    catch(err) {
        res.status(400).send('Something went wrong');
    }
});


// Delete API to delete a user by id (id is not defined in the schema but mongoDB automatically creates it)
app.delete('/user', async (req, res) => {
    const userId = req.body.userId; // Get the userId from the request body
    try {
        const user = await User.findByIdAndDelete(userId); // Find the user by id and delete  
        res.send("User deleted successfully"); // Send the deleted user data as the response
    }catch(err) {
        res.status(400).send('Something went wrong');
    }
});

//Update the data of the user using PATCH request
app.patch('/user', async (req, res) => {
    const userId = req.body.userId; // Get the userId from the request body 
    const data = req.body; // Get the data from the request body
    
    try{
        const ALLOWED_UPDATES = ['password', 'age', 'gender', 'photoUrl', 'about', 'skills'];
        const ISUpdateAllowed = Object.keys(data).every((update) => ALLOWED_UPDATES.includes(update)); // Check if all the fields to be updated are in the allowed updates array
        if(!ISUpdateAllowed) {
            throw new Error('Invalid updates!'); // Send a 400 response if any field is not allowed to be updated
        }
        const user = await User.findByIdAndUpdate(userId, data, 
            {returnDocument: 'after', runValidators: true}); // Find the user by id and update with the new data, returnDocument: 'after' returns the updated document, runValidators: true runs the validators defined in the schema
        res.send('User data updated successfully'); // Send a success response
    }catch(err) {
        res.status(400).send('Something went wrong');
    }
})





























connectDB().then(() => { // Connect to the database first before starting the server 
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log('Server is successfully listening on port 3000');
});
}).catch((err) => {
    console.log("Error in connecting to the database", err);
});
  

