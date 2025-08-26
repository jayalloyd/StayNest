const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");

// GET route to render the signup form
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// POST route to handle form submission
router.post("/signup", wrapAsync(async (req, res) => {
    // Access the data sent from the form via req.body
    try {
        let { username, email, password } = req.body;
        console.log("New user signup attempt:");
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","welcome to staynest");
            res.redirect("/listings");
        });
       
    } catch (e) {
        req.flash("error", "user already registered");
        res.redirect("/user/signup");
    }
}
));
//get login
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});
//logout get

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    });
});
// POST route to handle login with Passport.js authentication
router.post(
    "/login", 
    (req, res, next) => {
        console.log("Login POST route hit. User attempting to log in:", req.body.username);
        next();
    },
    passport.authenticate("local", { failureRedirect: "/user/login", failureFlash: true }),
    (req, res) => {
        console.log("Authentication successful! Redirecting...");
        req.flash("success", "Welcome back to StayNest!");
        res.redirect("/listings");
    }
);





module.exports = router;