//mongodb connection
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/bookborrow")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error occured while connecting to DB.", error);
  });
