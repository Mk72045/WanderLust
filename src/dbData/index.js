if (process.env.NODE_ENV != "production") {
  require("dotenv").config({path: "../.env"});
}

const mongoose = require("mongoose");
const data = require("./data");
const listing = require("../models/listings");

// const mongo = "mongodb://127.0.0.1:27017/wanderlust";
const mongo = process.env.ATLASDB_URL;

const connection = async () => {
  await mongoose.connect(mongo);
};

connection()
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("connection is failed", err);
  });

const cleardata = async () => {
  await listing.deleteMany({});
  data.data = data.data.map((el) => ({
    ...el,
    owner: "69bcd11823b9477bfedf9b60",
  }));
  await listing.insertMany(data.data);
  console.log("data is initiaslized");
};

cleardata();
