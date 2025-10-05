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




























connectDB().then(() => { // Connect to the database first before starting the server 
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log('Server is successfully listening on port 3000');
});
}).catch((err) => {
    console.log("Error in connecting to the database", err);
});
  

