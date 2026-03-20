const express = require("express");
const router = express.Router({ mergeParams: true });
const handleError = require("../utility/handleError");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controller/listings");
const multer = require("multer");         // takes multipart-Form upload img form Form
const {storage} = require("../cloudConfig");    
const upload = multer({storage});    // set dest: storage, means set img storage area

// show all and add new listing
router
  .route("/")
  .get(handleError(listingController.showAllListings))
  .post(
    isLoggedIn,
    upload.single("list[image]"),   // 
    validateListing,
    handleError(listingController.addNewListing),
  );

// add listings form
router.get("/new", isLoggedIn, handleError(listingController.addListingForm));

// edit a listing
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, handleError(listingController.editListingForm));

// Edit, show and delete
router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("list[image]"),
    validateListing,
    handleError(listingController.editListing),
  )
  .get(handleError(listingController.showListing))
  .delete(isLoggedIn, isOwner, handleError(listingController.destroyListing));

module.exports = router;

