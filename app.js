const express = require("express");
const app= express();
const mongoose=require("mongoose");
const Listing= require("./models/listing.js");
const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));// to parse data
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

//index route
app.get("/listings",async(req,res)=>{
    let allListings=await Listing.find({})
    res.render("./listings/index.ejs",{allListings});
});
//show route
app.get("/listings/:id",async (req,res)=>{

let {id}=req.params;
const listing=await Listing.findById(id);
res.render("listings/show.ejs",{listing});
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});