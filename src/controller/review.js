const listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findById(id);
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;
  list.reviews.push(newReview);

  await newReview.save();
  await list.save();

  res.redirect(`/listings/${id}`);
};

module.exports.distroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Review.findByIdAndDelete(reviewId);
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  res.redirect(`/listings/${id}`);
};

