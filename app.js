var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var index = require("./controllers/index");
var users = require("./controllers/users");
//add ref to the buds controller
const buds = require("./controllers/buds");
// add ref to the auth controller
const auth = require("./controllers/auth");

var app = express();

// if not in production mode, use .env file for db connection string
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// passport config
const passport = require("passport");
const session = require("express-session");

// enable session support
app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: true,
    saveUninitialized: false,
  })
);
//passport initialization w/ session support
app.use(passport.initialize());
app.use(passport.session());

// link the user model and ebable llocal auth in our mongodb
let User = require("./models/user");
// local strategy is default
passport.use(User.createStrategy());
// read/write user data to and from session object

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose db connection
const mongoose = require("mongoose");
const router = require("./controllers/auth");

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
// URL  maps to controllers
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/buds", buds);
app.use("/auth", auth);

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

/* GET /auth/login => show login form */
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
});
module.exports = app;
