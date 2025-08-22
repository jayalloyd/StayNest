const express = require("express");
const app= express();
const mongoose=require("mongoose");

const path=require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");
const session=require("express-session");
const flash=require("connect-flash");
const ExpressError=require("./utils/ExpressError.js")
const reviews=require("./routes/review.js");
const listings=require("./routes/listing.js");
const searchRouter=require("./routes/search.js");
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


const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7 * 24 * 60 * 60 *1000,
        maxAge:7 * 24 * 60 * 60 *1000,
        httpOnly:true
    },

};
app.use(session(sessionOptions));
app.use(flash());//always good to keep flash here before routes
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
     res.locals.error=req.flash("error");
    console.log(res.locals.success);
    next();
});
app.use("/search", searchRouter);
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


app.use((req, res, next) => {
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