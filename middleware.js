module.exports.isLoggedIn=((req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be signed in to continue");
    return res.redirect("/user/login");
    }
    next();
});
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.returnTo){
        res.locals.redirectUrl=req.session.returnTo;
    }else {
        // Fallback to a default page if no URL was saved
        res.locals.redirectUrl = '/listings'; 
    next();
    }};