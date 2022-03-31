// use mongoose to interact with MONGODB

const mongoose = require("mongoose");

// create a schema for a review document

let budSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
    trim: true,
  },
  strain: {
    type: String,
    required: "Strain is required",
    trim: true,
  },
  thc: {
    type: String,
    required: "THC Level required",
    trim: true,
  },
  cbd: {
    type: String,
    required: "CBD Level required",
    trim: true,
  },
  review: {
    type: String,
    required: "Review required",
    trim: true,
  },
});

// make the model public so the controller can call and use it
module.exports = mongoose.model("Bud", budSchema);
