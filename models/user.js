const mongoose = require("mongoose");
//passport-local-mongoose: used for authentiction
const plm = require("passport-local-mongoose");

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  oauthProvider: String,
  oauthId: String,
});

// use passport-local-mongosose as the one that handles all user functions
//also inherits from the specified library
userSchema.plugin(plm);

// make the model public
module.exports = new mongoose.model("User", userSchema);
