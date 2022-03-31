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

// GET /buds/create => load emplty buds form
router.get("/create", (req, res) => {
  res.render("buds/create", {
    title: "bud",
  });
});
// export this file so is it public
module.exports = router;
