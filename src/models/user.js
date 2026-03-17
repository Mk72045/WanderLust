const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const passportLocalMongoose = require("passport-local-mongoose").default;
// console.log(passportLocalMongoose);

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// username and password is generated automatically by the passpost package

UserSchema.plugin(passportLocalMongoose);

// passportLocalMongoose it does automatically username, password, salting, hashing...

module.exports = model("User", UserSchema);
