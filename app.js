var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var index = require("./controllers/index");
var users = require("./controllers/users");
//add ref to the reviews controller
const buds = require("./controllers/buds");

var app = express();

// if not in production mode, use .env file for db connection string
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// mongoose db connection
const mongoose = require("mongoose");

// try to connect
mongoose
  .connect(process.env.DATABASE_URL, {})
  .then((res) => {
    console.log("Connected to MongoDb");
  })
  .catch(() => {
    console.log("MongoDB connection failed");
  });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/buds", buds);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
