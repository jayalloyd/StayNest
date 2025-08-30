const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}= require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing= require("../models/listing.js");
const Review=require("../models/review.js") ;
const {isLoggedIn,isReviewAuthor} = require ("../middleware.js");
const ReviewController=require("../controllers/reviews.js");
const validateReview =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);//using joi
 
   if(error)
   {
    let errMsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
};


//review-post route
router.post("/",validateReview,isLoggedIn,wrapAsync(ReviewController.createReview));
//Reviews Delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.destroyReview));
 module.exports=router;