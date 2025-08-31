const express = require("express");
const router = express.Router();
const passport = require("passport");


const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js");

router.route("/signup")
      .get(userController.renderSignupForm)// GET route to render the signup form
      .post(wrapAsync(userController.signup));// POST route to handle form submission

router.route("/login")
      .get(userController.renderloginForm)
      .post(
        (req, res, next) => {// POST route to handle login with Passport.js authentication
        console.log("Login POST route hit. User attempting to log in:", req.body.username);
        next();
    },saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/user/login", failureFlash: true }),
    userController.postlogIn);


router.get("/logout",userController.logout)
      



module.exports = router;