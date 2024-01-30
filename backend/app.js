require("./email/index.js");
require("dotenv").config();
const file = require("express-fileupload");
const express = require("express"); //Express variable call
const app = express(); // call the express function and return value save to app
const indexRouter = require("./Routes/index.js");
const fileUpload = require("express-fileupload");
const middleware = require("./utils/middleware.js");
require("./models/index.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(file({ useTempFile: true }));
app.set("view engine", "ejs");
app.set("views", "templates/views");
app.use("/", indexRouter);
app.get("/", (req, res, next) => {
  // '/' is home route
  res.render("index");
});
app.get("/login", (req, res, next) => {
  res.render("login");
});
app.get("/signup", (req, res, next) => {
  // '/' is home route
  res.render("signup");
});
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
