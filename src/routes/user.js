const express = require("express");
const router = express.Router({ mergeParams: true });
// const User = require("../models/user");
const handleError = require("../utility/handleError");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controller/user");

router
  .route("/signup")
  .get(handleError(userController.signupForm))
  .post(handleError(userController.signupLogin));

router
  .route("/login")
  .get(handleError(userController.loginForm))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    handleError(userController.login),
  );

router.route("/logout").get(handleError(userController.logout));

module.exports = router;
