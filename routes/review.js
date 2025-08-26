const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}= require("../schema.js");
const ExpressError=require("../utils/ExpressError.js");
const Listing= require("../models/listing.js");
const Review=require("../models/review.js") ;
const {isLoggedIn} = require ("../middleware.js");
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
router.post("/",validateReview,isLoggedIn,wrapAsync(async(req,res)=>{
   let listing=    await  Listing.findById(req.params.id);
   let newReview=new Review(req.body.review);

   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
   console.log("newReview saved");
     req.flash("success","new reviewcreated");
   res.redirect(`/listings/${listing.id}`);
}));
//Reviews Delete route
router.delete("/:reviewId",isLoggedIn,wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
    console.log("review got deleted");
      req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
    }));

 module.exports=router;