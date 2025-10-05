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

app.get('/user', (req, res) => {    
    console.log(req.query);          // Accessing query parameters from URL (e.g. /user?name=deepak&age=21)    
    res.send({firstName: 'Deepak', lastName: 'Melkani'}); 
});

app.get('/user/:id/:name/:password', (req, res) => {      // Accessing route parameters from URL (e.g. /user/123/deepak/abcd)
    console.log(req.params);
    res.send({firstName: 'Deepak', lastName: 'Melkani', id: req.params.id, name: req.params.name, password: req.params.password});
});







// Regular expression in routes
app.get('/ab?cd', (req, res) => {        // ? means the preceding character is optional, b can appear once or not at all
    res.send('ab?cd');
});

app.get('/ab+cd', (req, res) => {        // + means the preceding character must appear at least once, b must appear once or more
    res.send('ab+cd');
});

app.get('/ab*cd', (req, res) => {        // * means the preceding character can appear any number of times, anything can appear in place of * (including nothing) 
    res.send('ab*cd');
});

app.get('/ab(cd)?e', (req, res) => {     // () groups the characters, cd can appear once or not at all
    res.send('ab(cd)?e');
});

app.get(/a/, (req, res) => {           // Regular expression without any string, matches any route containing 'a', e.g. /a, /abc, /abcd, /bca, /xyzabc
    res.send('/a/');
});

app.get(/.*fly$/, (req, res) => {      // Matches any route ending with 'fly' (e.g. butterfly, dragonfly), .* means any character (.) can appear any number of times (*)
    res.send('/.*fly$/');
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



// Multiple callback functions
// If we send response in the first callback, the next callback will not be executed
// To pass the control to the next callback function, we need to use next() 
// If we use next() in last callback, it will give error as there is no next callback to execute
// We can also wrap the callbacks in an array like app.use('/user', [cb1, cb2, cb3]) or use a combination of both array and individual callbacks like app.use('/user', [cb1, cb2], cb3, [cb4, cb5]) but there is no change in the working of the code
app.use(
    '/user', (req, res, next) => {
        console.log('First callback');
        res.send('First response');   // If response is sent, the next callback will not be executed
        next();      // To pass the control to the next callback function
    },
    (req, res, next) => {
        console.log('Second callback');
        res.send('Second response'); // This will give error since response is already sent in the first callback   
        next();
    }
)






app.listen(3000, () => {
  console.log('Server is successfullylistening on port 3000');
});
