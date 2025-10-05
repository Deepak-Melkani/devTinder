const adminAuth = app.use('/admin', (req, res, next) => {
    console.log("Admin authorization is being checked");
    // Logic to check if the user is admin or not 
    const token = "xyzgjdbd";
    const isAdmin = token === "xyzgjdbd";  // Dummy logic to check if the user is admin
    if(!isAdmin) {
        res.status(401).send('Unauthorized user');  // If user is not admin, send unauthorized response 
    }
    else {
        next();  // If user is admin, pass the control to the next callback
    }
});
module.exports = { adminAuth };// Adding multiple routes in expressJS
// Order matters, so the more specific routes should be at the top and the less specific routes should be at the bottom