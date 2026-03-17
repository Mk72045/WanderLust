const listing = require("../models/listing");

module.exports.showAllListings = async (req, res) => {
  let listings = await listing.find();
  res.render("listings/index", { listings });
};

module.exports.addListingForm = (req, res) => {
  res.render("listings/new");
};

module.exports.addNewListing = async (req, res, next) => {
  let { list } = req.body;
  list.owner = req.user.id;
  let newList = new listing(list);
  await newList.save();
  req.flash("success", "New listing is created successfully");
  res.redirect("/listings");
};

module.exports.editListingForm = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findById(id).populate("owner");

  if (!list) {
    req.flash("error", "This listing doesn't exists.");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { list });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findByIdAndUpdate(id, { ...req.body.list });
  if (!list) {
    req.flash("error", "This listing doesn't exists.");
    return res.redirect("/listings");
  }

  req.flash("success", "Listing is edited successfully");
  res.redirect(`/listings/${id}`);
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  let list = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!list) {
    req.flash("error", "This listing doesn't exists.");
    return res.redirect("/listings");
  }

  res.render("listings/show", { list });
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findByIdAndDelete(id);
  if (!list) {
    req.flash("error", "This listing doesn't exists.");
    return res.redirect("/listings");
  }

  req.flash("success", "Listing is deleted successfully");
  res.redirect("/listings");
};

// module.exports.
