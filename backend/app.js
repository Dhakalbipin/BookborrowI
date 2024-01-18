const express = require("express"); //Express variable call
const app = express(); // call the express function and return value save to app
const indexRouter = require("./Routes/index.js");
require("./models/index.js");
app.use(express.json());
app.use("/", indexRouter);
app.get("/", (req, res, next) => {
  // '/' is home route
  res.send("Hello Book Borrow System");
});
module.exports = app;
