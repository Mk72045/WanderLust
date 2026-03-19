const express = require("express");
const router = express.Router({ mergeParams: true });
const handleError = require("../utility/handleError");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware");
const reviewController = require("../controller/review");

// Reviews
router
  .route("/")
  .post(isLoggedIn, validateReview, handleError(reviewController.createReview));

// Delete Reviews
router
  .route("/:reviewId")
  .delete(isLoggedIn, isAuthor, handleError(reviewController.distroyReview));

module.exports = router;
