// Require all required files and packages
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utility/ExpressError");

const listingRouters = require("./routes/listings");
const reveiwRoutes = require("./routes/review");
const userRoutes = require("./routes/user");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");

// Authentication Area
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const atlas_db = process.env.ATLASDB_URL;

// for session store
const store = new MongoStore({
  mongoUrl: atlas_db,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // give this time in seconds, to auto refresh sessions
});

store.on("error", (err) => {
  console.log("Error in Mongo session store", err);
});

const sessionOptions = {
  store, // or we can write it as store: store,
  secret: process.env.SECRET, // Used to sign the session ID cookie.
  resave: false, // Do not save session again if nothing changed.
  saveUninitialized: true, //  Save session even if it is empty. Often set to false in production.
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Date.now() returnes current time in mini seconds like: 1773135743406
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevents JavaScript access to cookies (security).
  },
};

// Set up all things
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("anycode")); // this order must be maintain
app.use(session(sessionOptions));
app.use(flash());

// we require sessions to authenticate a user so write below always just after session middleware
app.use(passport.initialize()); // initialize passport when any requrest comes
app.use(passport.session()); // Read user from session, Attach it to req.user

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); // storing user related information when session starts
passport.deserializeUser(User.deserializeUser()); // unstoring user info when session ends

// Mongo DB connection
// const mongo = "mongodb://127.0.0.1:27017/wanderlust";

const connection = async () => {
  await mongoose.connect(atlas_db);
};

connection()
  .then(() => {
    console.log("connected to mongo");
    app.listen(8080, (req, res) => {
      console.log("connected to the port 8080");
    });
  })
  .catch((err) => {
    console.log("Mongo connection failed:", err);
  });

// middleware for success and failure
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Deffrient type of paths
app.use("/listings", listingRouters);
app.use("/listings/:id/reviews", reveiwRoutes);
app.use("/", userRoutes);

// Middleware of handle errors
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("listings/error", { err });
});
