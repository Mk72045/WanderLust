const express = require("express");
const router = express.Router({mergeParams: true}); 
const User = require("../models/user");
const handleError = require("../utility/handleError");
const passport = require("passport"); 
const {saveRedirectUrl} = require("../middleware");

router.get("/signup", (req, res) => {
    res.render("users/signup");
});

router.post("/signup", handleError(async (req, res) => {
    try {
        let {username, password, email} = req.body;
        let newUser = new User({username, email});
        let rUser = await User.register(newUser, password);

        req.login(rUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to the WonderLust!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", saveRedirectUrl,  passport.authenticate("local", 
    {
        failureRedirect: "/login",
        failureFlash: true
    }), async (req, res) => {
        req.flash("success", "Logged in to WonderLust");   
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {                // in case of any type  of error at the time of log out then it is executed
        if(err) {
           return next(err);
        }

        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;