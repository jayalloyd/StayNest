const express = require("express");
const app= express();
const mongoose=require("mongoose");
const Listing= require("./models/listing.js");
const Review= require("./models/review.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema,reviewSchema}= require("./schema.js");
const listings=require("./routes/listing.js");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));// to parse data
app.use(express.json());
app.use(methodOverride("_method"));

app.engine('ejs', ejsmate);
// app.use(express.static(path.join(__dirname,"/public")));



async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});


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


app.use("/listings",listings);

//review-post route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
   let listing=    await  Listing.findById(req.params.id);
   let newReview=new Review(req.body.review);

   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
   console.log("newReview saved");
   res.redirect(`/listings/${listing.id}`);
}));
//Reviws Delete route
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let{id,reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
    console.log("review got deleted");
    res.redirect(`/listings/${id}`);
    }));
app.all("/{*all}", (req, res, next) => { 
    next(new ExpressError(404, "Page not found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode,message}=err;
    res.render("error.ejs",{message:"something went wrong"}); 
    // res.status(statusCode).send(message);
});



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});