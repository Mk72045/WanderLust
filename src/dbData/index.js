const mongoose = require("mongoose");
const data = require("./data");
const listing = require("../models/listings");

const mongo = "mongodb://127.0.0.1:27017/wanderlust";

const connection = async () => {
    await mongoose.connect(mongo);
}

connection().then(() => {
    console.log("connected to mongodb");
}).catch(() => {
    console.log("connection is failed");
});

const cleardata = async () => {
    await listing.deleteMany({});
    data.data = data.data.map((el) => ({...el, owner: "69b4fc5046b8dcbd64bf0f0b"}));
    await listing.insertMany(data.data);
    console.log("data is initiaslized");
}


cleardata();