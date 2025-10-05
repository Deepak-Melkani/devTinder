const express = require('express');
const connectDB = require('./config/database');  
const User = require('./models/user');
const app = express();

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


// Middleware to parse JSON bodies, enabling us to access the content of the request body
app.use(express.json());
app.post('/signup', async (req, res) => {
    console.log(req.body); // Log the request body to the console
    const user = new User(req.body); // Create a new user instance with the data from the request body
    try {
        await user.save(); // Save the user to the database
        res.send('User added successfully'); // Send a success response
    } catch (err) {
        res.status(400).send('Error in saving the user'); // Send an error response if saving fails
    }
});

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





























connectDB().then(() => { // Connect to the database first before starting the server 
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log('Server is successfully listening on port 3000');
});
}).catch((err) => {
    console.log("Error in connecting to the database", err);
});
  

