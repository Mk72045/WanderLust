const listing = require("../models/listings");

module.exports.showAllListings = async (req, res) => {
  let listings = await listing.find();
  res.render("listings/index", { listings });
};

module.exports.addListingForm = (req, res) => {
  res.render("listings/new");
};

module.exports.addNewListing = async (req, res, next) => {
  let { list } = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  list.owner = req.user.id;

  let newList = new listing(list);
  newList.image = { url, filename };

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

  let oldImage = list.image.url;
  oldImage = oldImage.replace("upload", "upload/h_300,w_250");

  res.render("listings/edit", { list, oldImage });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let list = await listing.findById(id);

  if (!list) {
    req.flash("error", "This listing doesn't exists.");
    return res.redirect("/listings");
  }

  let updatedList = await listing.findByIdAndUpdate(id, { ...req.body.list }); // it update provided fields only

  if (typeof req.file !== "undefined") {    // typeof used to check vlaue is undefined or not
    let url = req.file.path;
    let filename = req.file.filename;
    updatedList.image = { url, filename };
    await updatedList.save();
  }

  req.flash("success", "Listing is updated successfully");
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
