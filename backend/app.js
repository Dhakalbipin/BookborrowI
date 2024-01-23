const express = require("express"); //Express variable call
const app = express(); // call the express function and return value save to app
const indexRouter = require("./Routes/index.js");
require("./models/index.js");
app.use(express.json());
app.use(express.urlencoded({extended:true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "templates/views");
app.use("/", indexRouter);
app.get("/", (req, res, next) => {
  // '/' is home route
  res.render("index");
});
app.get("/signup", (req, res, next) => {
  // '/' is home route
  res.render("signup");
});
module.exports = app;
