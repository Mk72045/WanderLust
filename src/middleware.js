const listing = require("./models/listings");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schema");
const ExpressError = require("./utility/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;

    req.flash("error", "You must be logged in first.");
    return res.redirect("/login");
  }

  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// Authorization for owner of a listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await listing.findById(id).populate("owner");

  if (!list) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  if (!list.owner._id.equals(req.user._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

// Authorization for author of a review
module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;

  let review = await Review.findById(reviewId).populate("author");

  if (!review) {
    req.flash("error", "Review does not exist.");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author._id.equals(req.user._id)) {
    req.flash("error", "You have not created this review.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// Validation function for server side for Listings
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(405, errMsg));
  } else next();
};

// Validation function for server side for Reviews
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(400, errMsg));
  } else next();
};

