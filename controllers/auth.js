const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

/* POST: /auth/register using the user model */
router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        // reload register view if attempt fails
        return res.render("auth/register");
      } else {
        //if reg is ok, log the user in and redirect to buds list
        req.login(user, (err) => {
          res.redirect("/buds");
        });
      }
    }
  );
});

/* GET /auth/register => show register form */

router.get("/register", (req, res) => {
  // before we load the view
  let messages = req.session.messages || [];
  // clear session messages
  req.session.messges = [];

  res.render("auth/register", {
    title: "Register",
    messages: messages,
  });
});

/* POST: /auth/login => attempt to validate user with passport-local */

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/buds",
    failureRedirect: "/auth/login",
    failureMessage: "Invaid Login",
  })
);

// GET /AUTH/LOGOUT => logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});
// public controller
module.exports = router;
