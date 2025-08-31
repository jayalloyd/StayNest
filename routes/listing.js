const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController =require("../controllers/listings.js");

// New Listing Route
router.get("/new", isLoggedIn,listingController.renderNewForm);
router.route("/")
.get(wrapAsync(listingController.index))//index route
.post(validateListing, isLoggedIn, wrapAsync(listingController.create));//create route

router.route("/:id")
      .get(wrapAsync(listingController.show))//show route 
       .put(validateListing, isLoggedIn, isOwner, wrapAsync(listingController.updateListing))//edit route
       .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));//delete route



router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));
router.get("/search/:country", wrapAsync(listingController.searchListing));

module.exports = router;