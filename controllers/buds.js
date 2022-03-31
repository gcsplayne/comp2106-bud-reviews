// import express and create an express router in this controller to dispatch http requets
const express = require("express");
const router = express.Router();

//import bud model for CRUD operations
const Bud = require("../models/bud");
/* GET root of buds */
router.get("/", (req, res) => {
  Bud.find((err, buds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("buds/index", { title: "Buds", buds: buds });
    }
  });
});

// GET /buds/create => load empty buds form
router.get("/create", (req, res) => {
  res.render("buds/create", {
    title: "Review a Bud",
  });
});

//POST /budscreate => post populated buds form to create

router.post("/create", (req, res) => {
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
router.get("/delete/:_id", (req, res) => {
  Bud.remove({ _id: req.params._id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/buds");
    }
  });
});
// export this file so is it public
module.exports = router;
