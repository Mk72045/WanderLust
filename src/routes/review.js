const express = require("express");
const router = express.Router({ mergeParams: true });
const listing = require("../models/listing");
const handleError = require("../utility/handleError");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware");
const Review = require("../models/review");
const reviewController = require("../controller/review");

// Reviews
router.post(
  "/",
  isLoggedIn,
  validateReview,
  handleError(reviewController.createReview),
);

// Delete Reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  handleError(reviewController.distroyReview),
);

module.exports = router;
