const express = require("express");
const app= express();
const mongoose=require("mongoose");
const Listing= require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js")
const {listingSchema}= require("./schema.js");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));// to parse data
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

//index route
app.get("/listings",wrapAsync(async(req,res)=>{
    let allListings=await Listing.find({})
    res.render("./listings/index.ejs",{allListings});
}));
//new route
app.get("/listings/new",(req,res)=>{
res.render("listings/new.ejs");
});

//create route
app.post("/listings",wrapAsync(async(req,res)=>{
 let result=listingSchema.validate(req.body);//using joi
 console.log(result);  
 const newListing=new Listing(req.body.listing);
   if(!result.error)
   {
    throw new ExpressError(400,result.error);
   }
   await newListing.save();
   res.redirect("/listings");
})
);

//show route
app.get("/listings/:id",wrapAsync(async (req,res)=>{

let {id}=req.params;
const listing=await Listing.findById(id);
res.render("listings/show.ejs",{listing});
}));
//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
let {id}=req.params;
const listing=await Listing.findById(id);
res.render("listings/edit.ejs",{listing});
}));
//update route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
let {id}=req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect(`/listings/${id}`);
}));

//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
let {id}=req.params;
let deletedListing= await Listing.findByIdAndDelete(id);
console.log(deletedListing);
res.redirect("/listings");
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