const express = require("express");
const router = express.Router();



// GET route to render the signup form
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// POST route to handle form submission
router.post("/signup", (req, res) => {
    // Access the data sent from the form via req.body
    const { username, email, password } = req.body;
    console.log("New user signup attempt:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    
    res.send("User created successfully! Check the server console for details.");
});




module.exports=router;