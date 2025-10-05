const express = require('express');

const app = express();

// "scripts": {                 // In package.json file (use npm start or npm run dev to run the server)
//     "start": "node app.js",
//     "dev": "nodemon app.js"
//   }

// app.use((req, res) => {                          // Basic template for sending response
//     res.send('Server ki taraf se ram ram')
// });

app.get('/test', (req, res) => {        // Only works for GET request, .use can be used for all requests
    res.send({firstName: 'Deepak', lastName: 'Melkani'});
});

app.post('/test', (req, res) => {       // Only works for POST request
    res.send('Post request on /test');
});

app.use('/test', (req, res) => { // Adding another route (Anything after /test will not be considered), works for all requests 
    res.send('<h1>Test Route</h1>');
});

app.use('/hello',(req, res) => {     // Adding another route (Anything after /hello will not be considered)
    res.send('<h1>Hello Route</h1>')
});

app.use('/', (req, res) => {//Adding a route (Anything after / will not be considered) Order matters, so this should be at the end
    res.send('<h1>Home Route</h1>')
});



app.listen(3000, () => {
  console.log('Server is successfullylistening on port 3000');
});
