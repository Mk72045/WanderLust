const express = require("express");
const router = express.Router({ mergeParams: true });
const handleError = require("../utility/handleError");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controller/listing");

// All listings
router.get(
  "/",
  handleError(listingController.showAllListings),
);

// Go to add listings
router.get("/new", isLoggedIn, handleError(listingController.addListingForm));

// Add new listings
router.post(
  "/",
  isLoggedIn,
  validateListing,
  handleError(listingController.addNewListing),
);

// Go to edit a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  handleError(listingController.editListingForm),
);

// Edit an extisting listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  handleError(listingController.editListing),
);

// Show deatils of a listing
router.get(
  "/:id",
  handleError(listingController.showListing),
);

// Delete a Listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  handleError(listingController.destroyListing),
);

module.exports = router;
