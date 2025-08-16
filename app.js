const express = require("express");
const app= express();
const mongoose=require("mongoose");

const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");

const ExpressError=require("./utils/ExpressError.js")
const reviews=require("./routes/review.js");
const listings=require("./routes/listing.js");
const { access } = require("fs");
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
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

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