// import express and create an express router in this controller to dispatch http requets
const express = require("express");
const router = express.Router();

//import bud model for CRUD operations
const Bud = require("../models/bud");
// auth
const passport = require("passport");
function isAuthenticated(req, res, next) {
  // is user authenticated or not
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth/login");
}

/* GET root of buds */
router.get("/", (req, res) => {
  Bud.find((err, buds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("buds/index", { title: "Buds", buds: buds, user: req.user });
    }
  });
});

// GET /buds/create => load empty buds form
router.get("/create", isAuthenticated, (req, res) => {
  res.render("buds/create", {
    title: "Review a Bud",
    user: req.user,
  });
});

//POST /budscreate => post populated buds form to create

router.post("/create", isAuthenticated, (req, res) => {
  // use our mongoose model to create a new bud from the submitted form body
  Bud.create(req.body, (err, bud) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/buds");
    }
  });
});

/* GET /BUDS/DELETE/ABC123 => DELETE BUDS WITH THE ID FOUND IN THE URL PARAM */
router.get("/delete/:_id", isAuthenticated, (req, res) => {
  Bud.remove({ _id: req.params._id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/buds");
    }
  });
});

/* GET /buds/edit/abc123 => show edit form populated with values of selected employer documents from url param  */
router.get("/edit/:_id", isAuthenticated, (req, res) => {
  Bud.findById(req.params._id, (err, bud) => {
    if (err) {
      console.log(err);
    } else {
      res.render("buds/edit", {
        title: "Bud Details",
        bud: bud,
        user: req.user,
      });
    }
  });
});

/* POST /buds/edit/abc/123 => update document in mongodb & redirect to index */
router.post("/edit/:_id", isAuthenticated, (req, res) => {
  Bud.findByIdAndUpdate({ _id: req.params._id }, req.body, null, (err, bud) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/buds");
    }
  });
});
// export this file so is it public
module.exports = router;
