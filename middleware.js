const Listing =require("./models/listing.js");
const ExpressError=require("./utils/ExpressError.js")
const { listingSchema } = require("./schema.js");
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
    module.exports.isOwner = async(req,res,next)=>{
        let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "permission denied");
       return res.redirect(`/listings/${id}`);
    }
    next();
    };
    module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);//using joi

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
