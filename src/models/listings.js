const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { builtinModules } = require("node:module");
const Review = require("./review");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (list) => {
    if(list) {
        await Review.deleteMany({_id: {$in: list.reviews}});
    }
})

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;

