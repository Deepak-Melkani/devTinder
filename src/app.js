const express = require('express');

const app = express();

// "scripts": {                 // In package.json file (use npm start or npm run dev to run the server)
//     "start": "node app.js",
//     "dev": "nodemon app.js"
//   }

app.use((req, res) => {                          // Basic template for sending response
    res.send('Server ki taraf se ram ram')
});

app.use('/test',(req, res) => {     // Adding a route
    res.send('<h1>Test Route</h1>')
});

app.use('/hello',(req, res) => {     // Adding another route
    res.send('<h1>Hello Route</h1>')
});


app.listen(3000, () => {
  console.log('Server is successfullylistening on port 3000');
});
