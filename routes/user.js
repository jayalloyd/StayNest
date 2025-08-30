const express = require("express");
const router = express.Router();
const passport = require("passport");


const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js");
// GET route to render the signup form
router.get("/signup", userController.renderSignupForm);

// POST route to handle form submission
router.post("/signup", wrapAsync(userController.signup));
//get login
router.get("/login", userController.renderloginForm);
//logout get

router.get("/logout",userController.logout);

// POST route to handle login with Passport.js authentication
router.post(
    "/login", 
    (req, res, next) => {
        console.log("Login POST route hit. User attempting to log in:", req.body.username);
        next();
    },saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/user/login", failureFlash: true }),
    userController.postlogIn);





module.exports = router;