// routes/search.js

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

router.get("/", wrapAsync(async (req, res) => {
    let { country } = req.query; 
    
    // Check if a search term was provided
    if (!country) {
        req.flash("error", "Please provide a search country.");
        return res.redirect("/listings"); // Redirect to the main listings page
    }

    const regex = new RegExp(country, 'i');
    let searchResults = await Listing.find({ country: regex });

    if (searchResults.length === 0) {
        req.flash("error", "No listings found for that country.");
        return res.redirect("/listings");
    }

    
    res.render("listings/showresults.ejs", { 
        allListings: searchResults, 
        searchedCountry: country 
    });
}));

module.exports=router;