const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


// Index Route
router.get("/", wrapAsync(async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Listing Route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

//create route
router.post("/", validateListing, isLoggedIn, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "new listing created");
    res.redirect("/listings");
}));

//show route - THIS IS THE CORRECT AND ONLY ONE
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Page not found");
        return res.redirect("/user/login");
    }
    res.render("listings/show.ejs", { listing });
}));


//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Page not found");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

//update route
router.put("/:id", validateListing, isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "listing updated");
    res.redirect(`/listings/${id}`);
}));

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " listing deleted");
    res.redirect("/listings");
}));

router.get("/search/:country", wrapAsync(async (req, res) => {
    let { country } = req.params;
    console.log(country);
    let results = await Listing.find({ country: country });
    console.log(results);
    res.render("/listings/showresults.ejs", { allListings: results });
}));

module.exports = router;