const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview=async(req,res)=>{
   let listing=    await  Listing.findById(req.params.id);
   let newReview=new Review(req.body.review);
   newReview.author=req.user._id;
   console.log(req.user);
   listing.reviews.push(newReview);
 
   await newReview.save();
   await listing.save();
   console.log("newReview saved");
     req.flash("success","new reviewcreated");
   res.redirect(`/listings/${listing.id}`);
};
module.exports.destroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
    console.log("review got deleted");
      req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
    
}
    ;
