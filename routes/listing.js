const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController =require("../controllers/listings.js");

// Index Route
router.get("/", wrapAsync(listingController.index));

// New Listing Route
router.get("/new", isLoggedIn,listingController.renderNewForm);

//create route
router.post("/", validateListing, isLoggedIn, wrapAsync(listingController.create));

//show route - THIS IS THE CORRECT AND ONLY ONE
router.get("/:id",wrapAsync(listingController.show));


//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
//update route
router.put("/:id", validateListing, isLoggedIn, isOwner, wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

router.get("/search/:country", wrapAsync(listingController.searchListing));

module.exports = router;