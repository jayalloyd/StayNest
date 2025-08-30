const User = require("../models/user.js");
module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async(req, res) => {
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
        
        console.error("Signup failed with error:", e);

        req.flash("error", "user already registered");
        res.redirect("/user/signup");
    }
};
module.exports.renderloginForm=(req, res) => {
    res.render("users/login.ejs");
};
module.exports.logout=async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    });
};
module.exports.postlogIn=(req, res) => {
        console.log("Authentication successful! Redirecting...");
        req.flash("success", "Welcome back to StayNest!");
        res.redirect(res.locals.redirectUrl);
    };