const express = require("express"); //Express variable call
const app = express(); // call the express function and return value save to app
require("./models/index.js");
app.get("/", (req, res, next) => {
  // '/' is home route
  res.send("Hello World");
});
module.exports = app;
