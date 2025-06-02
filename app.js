const express = require("express");
const app= express();
const mongoose=require("mongoose");
const Listing= require("./models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StayNest');
}
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
app.get("/testListing",async(req,res)=>{
let sampleListing=new Listing({
    title:"my new villa",
    description: "by way",
    price:12000,
    location:"Kochi",
    country:"India",
});
await sampleListing.save();
console.log("sample was saved");
    res.send("successful testing");
});


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});