const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController =require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
// New Listing Route
router.get("/new", isLoggedIn,listingController.renderNewForm);
router.route("/")
.get(wrapAsync(listingController.index))//index route
.post(validateListing,upload.single("listing[image]"), isLoggedIn, wrapAsync(listingController.create));//create route

router.route("/:id")
      .get(wrapAsync(listingController.show))//show route 
       .put(isLoggedIn, isOwner,upload.single("listing[image]"),validateListing,  wrapAsync(listingController.updateListing))//edit route
       .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));//delete route

router.get("/", wrapAsync(async(req, res) => {
    let { category } = req.query; // Get the category from the query string (e.g., /listings?category=Trending)
    let allListings;
    
    if (category) {
        // Find listings that match the requested category
        allListings = await Listing.find({ category: category });
    } else {
        // If no category is specified, show all listings
        allListings = await Listing.find({});
    }

    res.render("./listings/index.ejs", { allListings });
}));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
router.get("/search/:country", wrapAsync(listingController.searchListing));

module.exports = router;